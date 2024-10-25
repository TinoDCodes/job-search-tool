type ListingPlatform = "linkedin" | "indeed" | "upwork" | "toptal";

export type Job = {
  id?: string;
  title: string;
  company: string;
  location: string;
  dateListed: string;
  link?: string;
  imageSrc: string;
  platform: ListingPlatform;
};
