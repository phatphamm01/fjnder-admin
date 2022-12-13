import { ConversationResult, GenFields, User, UserResult } from "~/api-graphql";

export const getUserFragment = [
  "_id",
  "username",
  "aboutMe",
  "age",
  "birthDays",
  "calcDistance",
  "calcDistance",
  "company",
  "createdAt",
  "email",
  "isFirstLogin",
  "gender",
  "images",
  "isDeleted",
  "jobTitle",
  "isFirstLogin",
  "keyword",
  "lastActive",
  "liveAt",
  "phoneNumber",
  "school",
  "showMeTinder",
  "isFirstLogin",
  {
    mySetting: [
      {
        discovery: [
          "distance",
          "lookingFor",
          "maxAge",
          "minAge",
          "onlyShowAgeThisRange",
          "onlyShowDistanceThisRange",
        ],
      },
    ],
  },
  {
    matched: ["_id", "images", "username"],
  },
  {
    tags: ["_id", "name", "type"],
  },
] as GenFields<User>;

export const getAllUserFragment: GenFields<UserResult> = [
  "totalCount",
  {
    results: [
      "_id",
      "aboutMe",
      "age",
      "calcDistance",
      "company",
      "images",
      "jobTitle",
      "lastActive",
      "liveAt",
      "school",
      "username",
      {
        tags: ["_id", "name", "type"],
      },
    ],
  },
];

export const getUsersMatchedFragment: GenFields<ConversationResult> = [
  "totalCount",
  {
    results: [
      "_id",
      {
        user: ["_id", "username", "images"],
      },
    ],
  },
];

export const getUsersMessageFragment: GenFields<ConversationResult> = [
  "totalCount",
  {
    results: [
      {
        lastMessage: ["_id", "createdAt", "text", "type", "urlMessageImage"],
      },
      "_id",
      {
        user: ["_id", "username", "images"],
      },
    ],
  },
];
