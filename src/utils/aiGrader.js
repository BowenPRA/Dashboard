// Pointing to your live Vercel Production deployment!
const API_BASE_URL = 'https://y8-science-backend.vercel.app/api';

export const gradeShortAnswer = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gradeShortQA`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to grade short answer:", error);
    throw error; // Re-throw to handle it in the component
  }
};

export const gradeDiagram = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gradeDiagram`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to grade diagram:", error);
    throw error;
  }
};

// NEW: Added the Essay grading endpoint!
export const gradeEssay = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gradeEssay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to grade essay:", error);
    throw error;
  }
};