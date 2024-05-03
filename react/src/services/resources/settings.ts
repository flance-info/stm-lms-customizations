import { AccessTabFormValues } from 'pages/course/tabs/settings/tabs/access/access-tab-interfaces';
import { APIResource, MaterialsPayload } from './interfaces';
import { CertificateTabFormValues } from 'pages/course/tabs/settings/tabs/certificate/certificate-tab-intefaces';
import { MainTabFormValues } from 'pages/course/tabs/settings/tabs/main/main-tab-interfaces';
import { PrerequisitesTabFormValues } from 'pages/course/tabs/settings/tabs/prerequisites/prerequisites-tab-interfaces';

export interface MainSettingsPayload {
  main: Partial<MainTabFormValues>;
  id?: string;
}

export interface AccessPayload {
  access: Partial<AccessTabFormValues>;
  id?: string;
}

export interface PrerequisitesPayload {
  prerequisites: Partial<PrerequisitesTabFormValues>;
  id?: string;
}

export interface CertificatePayload {
  certificate: Partial<CertificateTabFormValues>;
  id?: string;
}

export class SettingsResource extends APIResource {
  get = (id?: string) => this._provider.get(`/courses/${id}/settings`);
  updateMain = ({ main, id }: MainSettingsPayload) => {
    const { image, co_instructor, ...otherValues } = main;
    const preparedData = { image_id: image?.id, co_instructor_id: co_instructor?.id, ...otherValues };

    return this._provider.put(`/courses/${id}/settings`, preparedData);
  };
  updateAccess = ({ access, id }: AccessPayload) => this._provider.put(`/courses/${id}/settings/access`, access);
  updatePrerequisites = ({ prerequisites, id }: PrerequisitesPayload) => {
    return this._provider.put(`/courses/${id}/settings/prerequisites`, prerequisites);
  };
  updateCertificate = ({ certificate, id }: CertificatePayload) => {
    return this._provider.put(`/courses/${id}/settings/certificate`, certificate);
  };
  updateCourseMaterials = ({ files, id }: MaterialsPayload) => {
    const preparedData = files.map((file) => ({ id: file.id, label: file.label }));

    return this._provider.put(`/courses/${id}/settings/files`, preparedData);
  };
}
