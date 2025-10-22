import fetch from "node-fetch";

export const fetchLinkedinImage = async (linkedinUrl) => {
  try {
    // mocking a random user
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const imageUrl = data.results[0].picture.large;
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error.message);
    return "https://ui-avatars.com/api/?name=No+Image";
  }
};
