import { APIResource } from '../interfaces';
import { Assignment, GoogleMeet, Lesson, Material, NewLesson, Section } from '~/models';
import { getPreparedLessonData } from './utils';
import { getNumberFieldValue } from '~/helpers/data';

export interface CurriculumResponse {
  sections: Section[];
  materials: Material[];
  scorm: {
    url: string;
    error: string;
    path: string;
    scorm_version: string;
  } | null;
}

export interface MaterialPayload {
  post_id: number;
  section_id?: number;
  order?: number;
}

export interface UpdateMaterialPayload {
  id: number;
  section_id: number;
  order: number;
}

interface ScormPayload {
  courseId: string;
  file: File;
}

export class CurriculumResource extends APIResource {
  getBy = (courseId: string) => this._provider.get<CurriculumResponse>(`/courses/${courseId}/curriculum`);

  sections = {
    create: (courseId: string, section: Pick<Section, 'title' | 'order'>) =>
      this._provider.post(`/courses/${courseId}/curriculum/section`, section),
    update: (courseId: string, section: Section) =>
      this._provider.put(`/courses/${courseId}/curriculum/section`, section),
    delete: (courseId: string, sectionId: number) =>
      this._provider.remove(`/courses/${courseId}/curriculum/section/${sectionId}`),
  };

  lessons = {
    getBy: (id?: string) => this._provider.get(`/lessons/${id}`),
    create: (lessonPayload: NewLesson) => {
      const data = getPreparedLessonData(lessonPayload);
      return this._provider.post('/lessons', data);
    },
    update: (values: Lesson) => {
      const data = getPreparedLessonData(values);
      return this._provider.put(`/lessons/${values.id}`, data);
    },
  };

  assignment = {
    getBy: (id: string) => this._provider.get(`/assignmentschild/${id}`),
    create: (values: Assignment) => {
      const { attempts, ...otherValues } = values;
      const data = { ...otherValues, attempts: getNumberFieldValue(attempts) };
      return this._provider.post('/assignmentschild', data);
    },
    update: (values: Assignment) => {
      const { attempts, ...otherValues } = values;
      const data = { ...otherValues, attempts: getNumberFieldValue(attempts) };
      return this._provider.put(`/assignmentschild/${values.id}`, data);
    },
  };

  googleMeet = {
    getBy: (id: string) => this._provider.get(`/google-meets/${id}`),
    create: (values: GoogleMeet) => {
      return this._provider.post('/google-meets', values);
    },
    update: (values: GoogleMeet) => {
      return this._provider.put(`/google-meets/${values.id}`, values);
    },
  };

  materials = {
    create: ({ courseId, data }: { courseId?: string; data: MaterialPayload }) => {
      return this._provider.post(`/courses/${courseId}/curriculum/material`, data);
    },
    delete: ({ courseId, id }: { courseId?: string; id: number }) => {
      return this._provider.remove(`/courses/${courseId}/curriculum/material/${id}`);
    },
    update: (courseId: string, materialPayload: UpdateMaterialPayload) => {
      return this._provider.put(`/courses/${courseId}/curriculum/material`, materialPayload);
    },
  };

  scorm = {
    post: ({ courseId, file }: ScormPayload) => {
      return this._provider.postFile(`/courses/${courseId}/scorm`, { file });
    },
    delete: (courseId: string) => this._provider.remove(`/courses/${courseId}/scorm`),
  };
}
