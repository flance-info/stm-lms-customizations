import { Option } from '~/models';

export const getStatus = (id: string, statuses: Option[]) => statuses.find(status => status.id === id);
