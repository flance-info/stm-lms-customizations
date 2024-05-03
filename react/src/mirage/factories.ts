import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
import { capitalize } from 'lodash';

import { Option } from '~/models';

export const categoryFactory = Factory.extend<{
  name: string;
}>({
  name: () => faker.lorem.word(),
});

export const questionsFactory = Factory.extend({
  question: () => capitalize(faker.lorem.words()),
  type: () => faker.helpers.arrayElement(['single_choice', 'multi_choice', 'true_false', 'item_match']),
  categories: [],
  // @ts-ignore
  afterCreate: (question: any, server: any) => {
    question.update({
      categories: server.createList('category', 3),
    });
  },
});

export const coInstructorFactory = Factory.extend({
  label: () => faker.name.firstName(),
  value: (i) => (i + 1).toString(),
});

export const mainFactory = Factory.extend<{
  title: string;
  slug: string;
  selectedCategories: string[];
  level: string;
  featuredImage: string;
  coInstructor: string;
  description: string;
  excerpt: string;
  status: string;
  courseViews: number;
  studentsLimit: number;
  currentStudents: number;
  levels: Option[];
  statuses: Option[];
  owner: {
    firstName: string;
    secondName: string;
    photoUrl: string;
  };
}>({
  title: () => faker.lorem.word(),
  slug: () => faker.lorem.slug(),
  selectedCategories: () => faker.helpers.arrayElements(['1', '2']),
  level: () => faker.datatype.number({ min: 1, max: 3 }).toString(),
  featuredImage: () => faker.lorem.word(),
  coInstructor: () => faker.datatype.number({ min: 1, max: 3 }).toString(),
  description: () => faker.lorem.text(),
  excerpt: () => faker.lorem.text(),
  status: () => faker.datatype.number({ min: 1, max: 3 }).toString(),
  courseViews: () => faker.datatype.number(20),
  studentsLimit: () => faker.datatype.number(20),
  currentStudents: () => faker.datatype.number(20),
  levels: () => [
    { label: 'level 1', id: '1' },
    { label: 'level 2', id: '2' },
    { label: 'level 3', id: '3' },
  ],
  statuses: () => [
    { label: 'status 1', id: '1' },
    { label: 'status 2', id: '2' },
    { label: 'status 3', id: '3' },
  ],
  owner: () => ({
    firstName: faker.name.firstName(),
    secondName: faker.name.lastName(),
    photoUrl: faker.image.avatar(),
  }),
});

export const accessFactory = Factory.extend<{
  status: string;
  trialCourse: boolean;
  freeLessonsNumber: number;
  timeLimit: boolean;
  courseExpiration: number;
  statuses: Option[];
}>({
  status: () => faker.datatype.number({ min: 1, max: 3 }).toString(),
  trialCourse: () => faker.datatype.boolean(),
  freeLessonsNumber: () => faker.datatype.number(20),
  timeLimit: () => faker.datatype.boolean(),
  courseExpiration: () => faker.datatype.number(20),
  statuses: [
    { label: 'status 1', id: '1' },
    { label: 'status 2', id: '2' },
    { label: 'status 3', id: '3' },
  ],
});

export const prerequisiteFactory = Factory.extend<{
  passingPercent: number;
  courses: { id: string; name: string }[];
}>({
  passingPercent: () => faker.datatype.number(20),
  courses: () => [{ id: '1', name: 'first' }],
});

export const certificateFactory = Factory.extend<{
  certificate: string;
  certificates: Option[];
}>({
  certificate: () => faker.datatype.number({ min: 1, max: 3 }).toString(),
  certificates: () => [
    { id: '1', label: 'Certificate 1' },
    { id: '2', label: 'Certificate 2' },
    { id: '3', label: 'Certificate 3' },
  ],
});

export const pricingFactory = Factory.extend<{
  oneTimePurchase: boolean;
  price: number;
  salePrice: number;
  priceDate: string;
  enterprice: boolean;
  enterpricePrice: number;
  membership: boolean;
  affiliateCourse: boolean;
  text: string;
  link: string;
  pointsPrice: number;
}>({
  oneTimePurchase: () => faker.datatype.boolean(),
  price: () => faker.datatype.number(20),
  salePrice: () => faker.datatype.number(20),
  priceDate: () => faker.datatype.datetime().toString(),
  enterprice: () => faker.datatype.boolean(),
  enterpricePrice: () => faker.datatype.number(20),
  membership: () => faker.datatype.boolean(),
  affiliateCourse: () => faker.datatype.boolean(),
  text: () => faker.lorem.word(),
  link: () => faker.lorem.word(),
  pointsPrice: () => faker.datatype.number(20),
});

export const faqFactory = Factory.extend<{
  items: { answer: string; question: string }[];
}>({
  items(i: number) {
    const number = i + 1;
    return [
      { answer: `some answer ${number}`, question: `some question ${number}` },
      { answer: `some answer ${number}`, question: `some question ${number}` },
      { answer: `some answer ${number}`, question: `some question ${number}` },
    ];
  },
});
