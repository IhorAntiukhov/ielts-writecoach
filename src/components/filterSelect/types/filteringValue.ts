import {
  privateFilteringOptions,
  publicFilteringOptions,
} from "../constants/filteringOptions";

export type PrivateFilteringValue =
  (typeof privateFilteringOptions)[number]["value"];

export type PublicFilteringValue =
  (typeof publicFilteringOptions)[number]["value"];
