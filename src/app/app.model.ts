export interface Feedback {
  managerBehaviour: string[];
  managerSkills: { name: string, value: boolean }[];
  personalDetails: {
    company: string;
    industry: string;
    companyLocation: string;
    companySize: string;
    designation: string;
    ageGroup: string;
    gender: string;
  };
  starRating: number;
  createdAt: string;
};

export interface Profile {
  uid: string,
  email: string,
  photoBase64: string
}