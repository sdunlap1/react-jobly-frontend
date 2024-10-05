import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  /** Core request method.
   * 
   * - endpoint: the API endpoint (e.g., "companies")
   * - data: an object of data to send to the API (for GET requests, it's query params)
   * - method: HTTP method to use (defaults to "get")
   * 
   * Example: await JoblyApi.request("companies", { name: "rithm" });
   *          => { companies: [{handle: "rithm", name: "Rithm School", ...}, ...] }
   */

  static async request(endpoint, data = {}, method = "get") {

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    
    // Get the token from localStorage if it's available
    const token = JoblyApi.token || localStorage.getItem("token");

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };  // Pass token in header
    const params = (method === "get")
        ? data
        : {};

    try {
      // Perform the request and return the response data
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      // Log the API error and throw a message for further handling
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies (optionally filtered by name). 
   * 
   * This method allows for searching companies by a search term. 
   * If no term is provided, it fetches all companies.
   */
  static async getCompanies(searchTerm = "") {
    const res = await this.request("companies", { name: searchTerm });
    return res.companies;
  }

  /** Get all jobs (optionally filtered by title).
   * 
   * This method allows for searching jobs by title. 
   * If no title is provided, it fetches all jobs.
   */
  static async getJobs(title = "") {
    const res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Login a user and return their token.
   * 
   * This method will send the user's credentials and receive a token.
   * The token will later be stored for authenticating requests.
   */
  static async login({ username, password }) {
    // Ensure username and password are passed as simple key-value pairs
    console.log("API Call: auth/token", { username, password });

    const res = await this.request("auth/token", { username, password }, "post");
    return res.token;
  }

  /** Signup a new user and return their token.
   * 
   * This method registers a new user and returns the token for that user.
   */
  static async signup(userData) {
    const res = await this.request("auth/register", userData, "post");
    return res.token;
  }

   /** Get the current user's details by username */
   static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user profile.
   * 
   * This method updates the profile of the current user.
   */
  static async updateProfile(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

/** Apply to a job by job ID. */
static async applyToJob(jobId) {
  return await this.request(`jobs/${jobId}/apply`, {}, "post");
}

}

export default JoblyApi;
