// Define constants for cache duration
const CACHE_DURATION = 1000 * 60 * 5; // Cache duration set to 5 minutes

// Hardcoded or default API token if needed
const ZENDESK_API_TOKEN = ''; // Replace with actual token if necessary

/**
 * Function to fetch data from backend API or Zendesk API
 *
 * @param {string} url - The API endpoint URL
 * @param {object} data - The data object to be sent in the request body
 * @param {string} method - The HTTP method (GET, POST, etc.)
 * @returns {Promise<object>} - The response data from the API
 */
const getDataForBackend = async (url, data = {}, method = 'GET') => {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        // Uncomment if you use the token
        // 'Authorization': `Bearer ${ZENDESK_API_TOKEN}`,
      },
      body: method === 'GET' ? null : JSON.stringify(data),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

/**
 * Function to fetch data, either from cache or API
 *
 * @param {string} endpoint - The API endpoint to fetch data from
 * @param {object} data - The data object to send with the request
 * @returns {Promise<object>} - The fetched data
 */
const fetchData = async (endpoint, data) => {
  const cache = localStorage.getItem(endpoint);
  const cacheTimestamp = localStorage.getItem(`${endpoint}_timestamp`);

  if (cache && cacheTimestamp) {
    const cacheAge = Date.now() - new Date(cacheTimestamp).getTime();
    if (cacheAge < CACHE_DURATION) {
      console.log(`Data fetched from local storage for ${endpoint}`);
      return JSON.parse(cache);
    }
  }

  console.log(`Data fetched from API for ${endpoint}`);
  const combinedData = [];
  let nextLink = endpoint;
  let hasMore = true;

  while (hasMore) {
    const jsonData = await getDataForBackend(nextLink, data, 'GET');
    const { data: pageData, next_page } = jsonData;
    combinedData.push(...pageData);

    hasMore = !!next_page;
    if (hasMore) {
      nextLink = next_page;
    }
  }

  try {
    localStorage.setItem(endpoint, JSON.stringify(combinedData));
    localStorage.setItem(`${endpoint}_timestamp`, new Date().toISOString());
  } catch (error) {
    if (error.name === "QuotaExceededError") {
      console.warn("Local storage quota exceeded. Data will not be cached.");
    } else {
      throw error;
    }
  }

  return combinedData;
};

/**
 * Fetch data based on dimension
 *
 * @param {object} data - The data containing dimension and other parameters
 * @param {boolean} show - Whether to display data on Excel
 * @returns {Promise<array>} - The response data
 */
const getDataFromAPI = async (data, show = false) => {
  const endpointMapping = {
    "Budget Categories": "budgetcategory",
    Currencies: "currency",
    Customers: "customer",
    Departments: "department",
    Locations: "location",
    Vendors: "vendor",
    Subsidiaries: "subsidiary",
    "Account Types": "account-type",
    "Transaction Type": "transaction-type-list",
    "Accounts (by Name)": "account",
    "Accounts (by Parent Name)": "parent-account",
    "Accounts (by Number)": "account",
    "Accounts (by Parent Number)": "parent-account",
    "Entity Status": "entity",
    Budgets: "budget",
    "Transaction Aged": "transaction-aging",
    "Transaction - Posted": "transaction-journal-entry",
    Items: "item",
    Classes: "classification",
    Employees: "employee",
    Partners: "partner",
    "Sales Reps": "sale-rep",
    Leads: "leads",
    Period: "account-period-list",
    "Zendesk Users": "https://your_zendesk_subdomain.zendesk.com/api/v2/users.json",
    "Zendesk Organizations": "https://your_zendesk_subdomain.zendesk.com/api/v2/organizations.json",
    "Zendesk User Fields": "https://your_zendesk_subdomain.zendesk.com/api/v2/user_fields.json"
  };

  const endpoint = endpointMapping[data.dimension];

  if (endpoint) {
    return await getData(endpoint, data, show);
  } else {
    return [];
  }
};

/**
 * Main function to get data and display it if needed
 *
 * @param {string} endpoint - The endpoint to fetch data from
 * @param {object} data - The data to send in the request body
 * @param {function} show - The function to display data on Excel
 * @returns {Promise<array>} - The response data
 */
const getData = async (endpoint, data, show) => {
  let jsonData;

  try {
    jsonData = await fetchData(endpoint, data);

    if (data.searchQuery && Object.keys(data.searchQuery).length > 0) {
      jsonData = filterData(jsonData, data.searchQuery);
    }

    if (data.selectParams && data.selectParams.length > 0) {
      jsonData = selectParams(jsonData, data.selectParams);
    }

    if (show) {
      showOnExcel(jsonData, data.direction, data.sheet, data.sheet_column);
    }

    return jsonData;
  } catch (error) {
    console.error(`Error processing data:`, error);
    return [];
  }
};

/**
 * Function to filter data based on search queries
 *
 * @param {array} data - The data to filter
 * @param {object} searchQuery - The search query parameters
 * @returns {array} - The filtered data
 */
const filterData = (data, searchQuery) => {
  // Implement your filtering logic here
  return data;
};

/**
 * Function to select specific parameters from data
 *
 * @param {array} data - The data to select from
 * @param {array} selectParams - The parameters to select
 * @returns {array} - The data with selected parameters
 */
const selectParams = (data, selectParams) => {
  // Implement your parameter selection logic here
  return data;
};

/**
 * Function to show data on Excel
 *
 * @param {array} data - The data to show
 * @param {string} direction - The direction to show data
 * @param {string} sheet - The Excel sheet name
 * @param {string} sheet_column - The Excel sheet column
 */
const showOnExcel = (data, direction, sheet, sheet_column) => {
  // Implement your Excel display logic here
};

export default getDataFromAPI;
