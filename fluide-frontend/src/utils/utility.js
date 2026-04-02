export const convertModulesToArray = (modulesObj) => {
  // Check if modulesObj is an object or an array
  if (Array.isArray(modulesObj)) {
    // If it's already an array, return it
    return modulesObj;
  } else {
    // Otherwise, convert the object to an array of module objects
    return Object.entries(modulesObj).map(([key, value]) => {
      return {
        module_id: key,
        module_title: value.module_title,
        description: value.description,
      };
    });
  }
};

export const convertLessonToArray = (dataArray) => {
  if (Array.isArray(dataArray)) {
    return dataArray;
  } else {
    return Object.entries(dataArray).map(([key, value]) => {
      return {
        lesson_id: key,
        lesson_title: value.lesson_title,
        chapter_title: value.chapter_title,
      };
    });
  }
};

export function getNameFromEmail(email) {
  if (email === undefined || email === null) {
    // Return an empty string or any appropriate value for undefined email
    return "";
  }
  const atIndex = email.indexOf("@");

  if (atIndex === -1) {
    // If the email does not contain an "@" symbol, return the entire string
    return email;
  }
  // Extract the part of the email address before the "@" symbol
  const name = email.slice(0, atIndex);
  // Capitalize the first letter of the name and return it
  return name.charAt(0).toUpperCase() + name.slice(1);
}


export const removeConsecutiveSpaces = (dataArr) => {
  const cleanedData = [];
  let count = 0;


  for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i] === " ") {
      count++;
    } else {
      count = 0;
    }

    if (count <= 2) {
      cleanedData.push(dataArr[i]);
    }
  }

  return cleanedData;
};

export const removeThirdConsecutiveEmpty = (currentData, receivedData) => {
  const updatedData = [...currentData, ...receivedData.split(" ")];
  let consecutiveEmptyCount = 0;

  for (let i = updatedData.length - 1; i >= 0; i--) {
    if (updatedData[i] === "") {
      consecutiveEmptyCount++;

      if (consecutiveEmptyCount === 3) {
        updatedData.splice(i, 1); // Remove the third consecutive empty string
        break;
      }
    } else {
      consecutiveEmptyCount = 0;
    }
  }

  return updatedData;
};


export const formatData = (rawData) => {
  let formattedData = "";
  let currentParagraph = "";

  rawData.forEach((word) => {
    if (word === "\"\\n\"") {
      if (currentParagraph !== "") {
        formattedData += currentParagraph.trim() + "\n\n";
        currentParagraph = "";
      }
    } else {
      const trimmedWord = word.replace(/"/g, "");
      currentParagraph += trimmedWord + " ";
    }
  });

  if (currentParagraph !== "") {
    formattedData += currentParagraph.trim();
  }

  return formattedData;
};
