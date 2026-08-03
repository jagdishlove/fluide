const { z } = require("zod");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const {
  SystemMessage,
  HumanMessage,
  AIMessage,
} = require("@langchain/core/messages");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const { User } = require("../models");
const tokenService = require("./token.service");
const emailService = require("./email.service");

const getModuleSchema = z.object({
  Title: z.string().describe("The name of the subject title"),
  Description: z.string().describe("A clear explanation of how it works"),
});

const getLessonsSchema = z.object({
  Title: z.string().describe("The name of the subject title"),
  Chapters: z.array(z.string()).describe("A clear explanation of how it works"),
});

const quizAnswerSchema = z
  .array(z.string())
  .min(2)
  .max(2)
  .describe("Array with [answer text, explanation]");

const quizAnswersSchema = z.object({
  "Answer 1": quizAnswerSchema,
  "Answer 2": quizAnswerSchema,
  "Answer 3": quizAnswerSchema,
  "Answer 4": quizAnswerSchema,
});

const quizQuestionSchema = z.object({
  Question: z.string().describe("Quiz question text"),
  Answers: quizAnswersSchema,
});

const ResponseSchema = z.array(getModuleSchema);
const getLessonsResponseSchema = z.array(getLessonsSchema);
const getQuizResponseSchema = z.array(quizQuestionSchema).length(3);

const chat1 = new ChatGoogleGenerativeAI({
  apiKey: config.googleApiKey,
  model: "gemini-3.1-flash-lite-preview",
  temperature: 0,
  maxRetries: 3,
  max_tokens: -1,
});
const chat2 = new ChatGoogleGenerativeAI({
  apiKey: config.googleApiKey,
  model: "gemini-pro",
  temperature: 0.6,
});
const chat3 = new ChatGoogleGenerativeAI({
  apiKey: config.googleApiKey,
  model: "gemini-pro",
  temperature: 0.8,
});

const getModuleChat = chat1.withStructuredOutput(ResponseSchema);
const getLessonsChat = chat1.withStructuredOutput(getLessonsResponseSchema);
const getQuizChat = chat1.withStructuredOutput(getQuizResponseSchema);

const getModule = async (data) => {
  const { topic, level, language } = data;
  try {
    const response = await getModuleChat.invoke([
      new SystemMessage(`You are an intelligent tutor who is an expert in any academic or professional topic that your student wants to learn about.

     When you teach, your educational content is of the highest quality, most often combining concepts, theories, facts, and information that give the full picture of the topic to your student.

     You can write educational content in 10 languages: English, Mandarin, Hindi, Spanish, French, Arabic, Bengali, Portuguese, German, and Japanese.

     You can adapt your educational content and the vocabulary you use to the level of the student. You can use different teaching techniques to best communicate with your student based on 3 proficiency levels: beginner, intermediate, or advanced.

     You will be provided with an academic or professional topic, the student’s level, and the student’s language, in the following format:
     Topic: …
     Student’s Level: …
     Student’s Language: …

     Your task is to generate a list of every relevant module that the topic is comprised of. You will use vocabulary that is adapted to the student’s level. You will write your answer in the student’s language.
     The modules you generate must represent all the main branches of that topic.

     In order to provide an excellent answer, you will follow the below list of requirements between triple hashtags, exactly as they are listed. Before providing your answer, check that all requirements within the following list have been satisfied.

     Requirements:
     ###
     - Generate between 6 and 8 modules for the topic, not less, not more. The broader the topic, the larger the number of modules should be.
     - Write your answer only in the student’s language indicated.
     - Adapt the ideas and vocabulary you use in your answer to the student’s level indicated.
     - The modules generated should be distinct from each other and not repetitive.
     - Each module consists of a title and a description.
     - Each module’s title must be clear and concise. It can either be 1 word or a very short sentence, but the shorter, the better.
     - Each module’s description must be a clear and concise summary of what the student will learn about in that specific module.
     - Each module’s description must be at least 10 words long and at most 80 words long.
     - Your answer should only contain the modules' titles and descriptions, nothing else.
     - In your answer, do not include any character that would result in the following error: "Unexpected token in JSON". Therefore, you must absolutely avoid any character that is not allowed in JSON, such as "#" and "]".
     - Provide your answer in the format below.
     Format of Answer:
     [{'Title': <module_title>, {{'Description': <description>}}}, ..., {'Title': <module_title>, {{'Description': <description>}}}]
     ###

     You will stay objective, and since you are an expert in the topic, you will stay confident in your answers.

     If you understand, say OK.`),
      new AIMessage("OK"),
      new HumanMessage(
        `Topic: ${topic}
      Student’s Level: ${level}
      Student’s Language: ${language}`,
      ),
    ]);
    // const newResponse = {
    //   content:
    //     "[{'Title': 'Geography & People', 'Description': 'Learn about where the Philippines is located in Southeast Asia and the diverse groups of people who live across its many islands, understanding their basic identities.'}, {'Title': 'History Snapshot', 'Description': 'Discover the major events and influences that shaped the Philippines, from ancient times to the Spanish and American colonial periods, in a simple overview.'}, {'Title': 'Family & Community', 'Description': 'Explore the strong importance of family in Filipino life, including respect for elders, close-knit relationships, and the spirit of helping neighbors called \"bayanihan.\"'}, {'Title': 'Filipino Cuisine', 'Description': 'Get to know popular Filipino dishes like adobo and sinigang, common ingredients, and the significant role food plays in daily life and special celebrations.'}, {'Title': 'Festivals & Traditions', 'Description': 'Learn about the colorful fiestas, unique customs, and traditional celebrations that bring communities together with music, dance, and parades across the islands.'}, {'Title': 'Arts & Expressions', 'Description': 'Discover traditional Filipino music, folk dances, intricate crafts like weaving, and other creative ways Filipinos express their rich heritage and stories.'}, {'Title': 'Language & Communication', 'Description': 'Understand the national language, Filipino (based on Tagalog), learn some common phrases, and explore how Filipinos communicate and interact with each other.'}]",
    //   additional_kwargs: {
    //     finishReason: "STOP",
    //     index: 0,
    //     __gemini_function_call_thought_signatures__: {},
    //   },
    //   response_metadata: {
    //     tokenUsage: {
    //       promptTokens: 676,
    //       completionTokens: 289,
    //       totalTokens: 1565,
    //     },
    //     finishReason: "STOP",
    //     index: 0,
    //   },
    //   tool_calls: [],
    //   invalid_tool_calls: [],
    //   usage_metadata: {
    //     input_tokens: 676,
    //     output_tokens: 289,
    //     total_tokens: 1565,
    //   },
    // };
    return response;
  } catch (error) {
    console.error("Error in getModule:", error);
    throw error;
  }
};

const getLessons = async (data) => {
  const { module_name, level, language, topic } = data;

  const response = await getLessonsChat.invoke([
    new SystemMessage(`You are an intelligent tutor who is an expert in any academic or professional topic that your student wants to learn about. 
  
      When you teach, your educational content is of the highest quality, most often combining concepts, theories, facts, and information that give the full picture of the topic to your student. 
      
      You can write educational content in 10 languages: English, Mandarin, Hindi, Spanish, French, Arabic, Bengali, Portuguese, German, and Japanese.
      
      You can adapt your educational content and the vocabulary you use to the level of the student. You can use different teaching techniques to best communicate with your student based on 3 proficiency levels: beginner, intermediate, or advanced.
      
      You will be provided with an academic or professional topic, a module that represents a branch of the topic, the student’s level, the student’s language, in the following format:
      Topic: …
      Module: …
      Student’s Level: …
      Student’s Language: …
      
      Your task is to generate a list of every relevant lesson that the module is comprised of, within the context of the given topic. You will use vocabulary that is adapted to the student’s level. You will write your answer in the student’s language. 
      The lessons you generate must represent all the main components of that module. 
      The outline you generate must meet a length requirement of at least one semester's worth of lessons.
      
      In order to provide an excellent answer, you will follow the below list of requirements between triple hashtags, exactly as they are listed. Before providing your answer, check that all requirements within the following list have been satisfied.
      
      Requirements:
      ###
      - Generate between 6 and 8 lessons for the module, not less, not more. The broader the module, the larger the number of lessons should be.
      - Write your answer only in the student’s language indicated.
      - Adapt the ideas and vocabulary you use in your answer to the student’s level indicated.
      - The lessons generated should be distinct from each other and not repetitive.
      - Each lesson consists of a title along with multiple chapter titles that represent the most important components (principles, concepts, ideas, teachings) to learn about within that lesson.
      - Each lesson’s title must be clear and concise. It can either be 1 word or a very short sentence, but the shorter, the better. 
      - Each lesson’s chapter titles must be clear and concise, and they should represent the most important principles, concepts, ideas, teachings that the student will learn in that specific lesson.
      - Generate between 5 and 8 chapters for each lesson. The broader the lesson, the larger the number of chapters should be.
      - Your answer should only contain the lessons's titles along with their respective chapter titles, nothing else.
      - In your answer, do not include any character that would result in the following error: "Unexpected token in JSON". Therefore, you must absolutely avoid any character that is not allowed in JSON, such as "#" and "]".
      - Provide your answer in the format below.
      Format of Answer:
      [{'Title': <lesson_title>, {'Chapters': [<first_chapter_title>, ..., <last_chapter_title>]}}, ..., {'Title': <lesson_title>, {'Chapters': [<first_chapter_title>, ..., <last_chapter_title>]}}]
      ###
      
      You will stay objective, and since you are an expert in the topic, you will stay confident in your answers.
      
      If you understand, say OK.`),
    new AIMessage("OK"),
    new HumanMessage(
      `Topic: ${topic} 
      Module: ${module_name}
      Student’s Level: ${level}
      Student’s Language: ${language}`,
    ),
  ]);

  return response;
};

const getQuiz = async (data) => {
  const { description, level, language } = data;

  const response = await getQuizChat.invoke([
    new SystemMessage(`You now have the source text, along with the student's level and language.

        You are an intelligent tutor who is an expert in any academic or professional topic that your student wants to learn about. 
        
        When you teach, your educational content is of the highest quality, most often combining concepts, theories, facts, and information that give the full picture of the topic to your student. 
        
        You can write educational content in 10 languages: English, Mandarin, Hindi, Spanish, French, Arabic, Bengali, Portuguese, German, and Japanese.
        
        You can adapt your educational content and the vocabulary you use to the level of the student. You can use different teaching techniques to best communicate with your student based on 3 proficiency levels: beginner, intermediate, or advanced.
        
        Your tasks are to:
        1. Generate exactly 3 quiz questions at the student's level and in the student's language based on the provided text.
        2. Generate exactly 4 possible answers for each quiz question.
        3. Ensure the first answer is the correct one and the remaining three answers are incorrect.
        4. Generate a thorough explanation for each possible answer outlining why it is correct or incorrect.
        
        Requirements:
        - Each quiz question should be related to a concept or idea from the text.
        - Each quiz question should be at the student's level.
        - Each quiz question should have exactly 4 possible answers, 1 correct and 3 incorrect.
        - Each quiz question must be at most 20 words long.
        - Each possible answer should be at the student's level.
        - Each possible answer must be at most 30 words long.
        - Each explanation should be thorough and be between 15 and 50 words, expanding on the reason(s) why the answer is correct or incorrect.
        Return only the requested quiz content with no extra commentary.`),
    new AIMessage("OK"),
    new HumanMessage(`
        Text: ${description}
        Student's Level: ${level}
        Student's Language: ${language}
        `),
  ]);

  return response;
};

// const getQuizAnswer = async (data) => {
//   const { question, language, answer1, answer2, answer3, answer4 } = data;

//   const prompt_template = `Question and language are provided with possible answers.
//     Find correct answer from possible answer.
//     Each Incorrect and correct answer has exlanation.
//     Explain correct and incorrect answer in 100 words.
//     Must consider language of question and answers.
//     Provide explanation of each answer in specified language.

//     ### INSTRUCTION ###
//     Sequence of response should be the as provided possible answers for the answer.
//     Each answer and explanation has an object.
//     Each question must have only a correct answer.

//     question: ${question}
//     language: ${language}

//     #### possible answer ###
//     answer1: ${answer1}
//     answer2: ${answer2}
//     answer3: ${answer3}
//     answer4: ${answer4}

//     Desired formet in json: [ { answer1: <Correct or Incorrect>, explanation: <explanation> }]`;

//   const completion = await openai
//     .createChatCompletion({
//       model: model,
//       messages: [{ role: "user", content: prompt_template }],
//       temperature: 0.6,
//     })
//     .catch((err) => {
//       throw new ApiError(err.response.status, err.response.data);
//     });

//   return completion;
// };

const register = async (data) => {
  const emailExist = await User.findOne({
    email: data.email,
    isDeleted: false,
  });
  if (emailExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists.");
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(data.password, salt);
    const user = new User({
      email: data.email,
      password: hashPassword,
      isVerified: false,
    });
    const token = await tokenService.generateAuthTokens(user);
    await emailService.sendVerificationEmail(data.email, token.accessToken);
    await user.save();
    delete user.password;
    return { user, token };
  }
};

const login = async (data) => {
  const userExist = await User.findOne({ email: data.email, isDeleted: false });
  if (!userExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please enter a valid email address and password.",
    );
  } else {
    if (userExist.isVerified == false) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Please verify your account before proceeding.",
      );
    }
    const valid = bcrypt.compareSync(data.password, userExist.password);
    if (!valid) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Please enter a valid email address and password.",
      );
    } else {
      const token = await tokenService.generateAuthTokens(userExist);
      const user = userExist.toObject();
      delete user.password;
      return { user, token };
    }
  }
};

const updateProfile = async (data, userData) => {
  const user = await User.findByIdAndUpdate(userData._id, {
    firstName: data.firstName,
    lastName: data.lastName,
  });
  return user;
};

const getProfile = async (userData) => {
  const user = await User.findById(userData._id);
  delete user.password;
  return { user };
};

const deleteProfile = async (user) => {
  console.log(user, "user");
  const profile = await User.findByIdAndUpdate(user._id, { isDeleted: true });
  return profile;
};

const loginSucess = async (userData) => {
  const email = userData.emails[0].value;
  const firstName =
    userData.name?.givenName || userData.displayName?.split(" ")[0] || "";
  const lastName =
    userData.name?.familyName || userData.displayName?.split(" ").slice(1).join(" ");

  let user = await User.findOne({ email });
  if (user) {
    if (user.isDeleted) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "This account has been deactivated.",
      );
    }
    if (!user.firstName && firstName) user.firstName = firstName;
    if (!user.lastName && lastName) user.lastName = lastName;
    if (user.isModified()) await user.save();
  } else {
    user = new User({ email, isVerified: true, firstName, lastName });
    await user.save();
  }

  const token = await tokenService.generateAuthTokens(user);
  const userObj = user.toObject();
  delete userObj.password;
  return { user: userObj, token };
};

const verifyEmail = async (data) => {
  const user = await User.findOneAndUpdate(
    { _id: data.id },
    { isVerified: true },
  );
  return user;
};

const changePassword = async (data, user) => {
  let response = await User.findById(user._id);
  const valid = bcrypt.compareSync(data.oldPassword, response.password);
  if (!valid) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please enter the correct old password.",
    );
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(data.newPassword, salt);
    response = await User.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });
    return response;
  }
};

function generateRandomString(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const resetPassword = async (data) => {
  const userExist = await User.findOne({ email: data.email });
  if (!userExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The email you provided doesn't exist with us.",
    );
  }
  const randomString = generateRandomString(10);
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(randomString, salt);
  await emailService.sendResetPasswordEmail(data.email, randomString);
  await User.findOneAndUpdate(
    { email: data.email },
    { password: hashPassword },
  );
  return userExist;
};

module.exports = {
  getModule,
  getLessons,
  getQuiz,
  register,
  login,
  updateProfile,
  getProfile,
  loginSucess,
  deleteProfile,
  verifyEmail,
  changePassword,
  resetPassword,
};
