import { createContext, useContext } from 'react';

import {
  AnnouncementResource,
  CategoriesResource,
  CommentsResource,
  CourseResources,
  CurriculumResource,
  DripResources,
  FaqResource,
  FilesResource,
  GrassbladeResource,
  LessonsResource,
  MaterialsResource,
  MediaGalleryResource,
  PricingResource,
  QuestionsResource,
  QuizResource,
  SettingsResource,
  WordpressResource,
} from './resources';
import { DataProvider } from './data-provider';

class ApiProvider {
  private readonly _lmsProvider: DataProvider;
  private readonly _wpProvider: DataProvider;
  private readonly _resources: {
    announcement: AnnouncementResource;
    categories: CategoriesResource;
    comments: CommentsResource;
    course: CourseResources;
    curriculum: CurriculumResource;
    drip: DripResources;
    faq: FaqResource;
    files: FilesResource;
    grassblade: GrassbladeResource;
    lessons: LessonsResource;
    materials: MaterialsResource;
    mediaGallery: MediaGalleryResource;
    pricing: PricingResource;
    questions: QuestionsResource;
    quiz: QuizResource;
    settings: SettingsResource;
    wordpress: WordpressResource;
  };

  constructor(lmsProvider: DataProvider, wpProvider: DataProvider) {
    this._lmsProvider = lmsProvider;
    this._wpProvider = wpProvider;

    this._resources = {
      announcement: new AnnouncementResource(this._lmsProvider),
      categories: new CategoriesResource(this._lmsProvider),
      comments: new CommentsResource(this._lmsProvider),
      course: new CourseResources(this._lmsProvider),
      curriculum: new CurriculumResource(this._lmsProvider),
      drip: new DripResources(this._lmsProvider),
      faq: new FaqResource(this._lmsProvider),
      files: new FilesResource(this._lmsProvider),
      grassblade: new GrassbladeResource(this._lmsProvider),
      lessons: new LessonsResource(this._lmsProvider),
      materials: new MaterialsResource(this._lmsProvider),
      mediaGallery: new MediaGalleryResource(this._lmsProvider),
      pricing: new PricingResource(this._lmsProvider),
      questions: new QuestionsResource(this._lmsProvider),
      quiz: new QuizResource(this._lmsProvider),
      settings: new SettingsResource(this._lmsProvider),
      wordpress: new WordpressResource(this._wpProvider),
    };
  }
  public getResources = () => this._resources;
}

const apiUrl = process.env.REACT_APP_API_URL || window.lmsApiSettings.lmsUrl;
const lmsProvider = new DataProvider(apiUrl, window.lmsApiSettings.nonce);
const wpProvider = new DataProvider(window.lmsApiSettings.wpUrl, window.lmsApiSettings.nonce);
export const apiProvider = new ApiProvider(lmsProvider, wpProvider);
export const ApiContext = createContext<ApiProvider>({} as ApiProvider);
export const useApi = () => {
  const api = useContext(ApiContext);
  return api.getResources();
};
