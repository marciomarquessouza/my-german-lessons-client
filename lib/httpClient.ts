const baseUrl = "http://localhost:3000/api";

async function getData<T>(path: string) {
  try {
    const response = await fetch(`${baseUrl}${path}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const data = json as T;
    return {
      status: response.status,
      ...data,
    };
  } catch (error) {
    throw error;
  }
}

async function removeData<T>(path: string) {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const data = json as T;
    return {
      status: response.status,
      ...data,
    };
  } catch (error) {
    throw error;
  }
}

async function postData<T>(
  path: string,
  body: T
): Promise<{ status: number; message: string }> {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return {
      status: response.status,
      ...json,
    };
  } catch (error) {
    throw error;
  }
}

async function putData<T>(
  path: string,
  body: T
): Promise<{ status: number; message: string }> {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return {
      status: response.status,
      ...json,
    };
  } catch (error) {
    throw error;
  }
}

export const httpClient = {
  GET: getData,
  POST: postData,
  PUT: putData,
  DELETE: removeData,
};
