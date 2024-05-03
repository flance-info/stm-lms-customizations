import { AxiosRequestConfig, AxiosProgressEvent } from 'axios';

export interface RequestParams {
  options: AxiosRequestConfig;
  queryString?: string;
}

export interface FilePayload {
  file: File;
  title?: string;
}

export interface Config extends AxiosRequestConfig {
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  signal?: AbortSignal;
}
