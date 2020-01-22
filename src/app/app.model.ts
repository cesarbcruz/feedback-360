export interface Feedback {
  skill:string,
  rating:number,
};

export interface Profile {
  uid: string,
  name: string,
  email: string,
  photoBase64: string,
  jobTitle: string,
}

export interface Job {
  name: string,
  skills:string[]
}