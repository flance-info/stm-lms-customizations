import { createServer, hasMany, Model, Serializer } from 'miragejs';

import {
  accessFactory,
  categoryFactory,
  certificateFactory,
  coInstructorFactory,
  faqFactory,
  mainFactory,
  prerequisiteFactory,
  pricingFactory,
  questionsFactory,
} from './factories';

const ApplicationSerializer = Serializer.extend({
  root: false,
  embed: true,
});

export function makeServer({ environment = 'test' }) {
  return createServer({
    serializers: {
      application: ApplicationSerializer,
      question: ApplicationSerializer.extend({
        include: ['categories'],
      }),
    },
    environment,
    models: {
      category: Model,
      courses: Model,
      coInstructor: Model,
      main: Model,
      access: Model,
      prerequisite: Model,
      certificate: Model,
      pricing: Model,
      faq: Model,
      question: Model.extend({
        categories: hasMany(),
      }),
    },
    factories: {
      category: categoryFactory,
      coInstructor: coInstructorFactory,
      main: mainFactory,
      access: accessFactory,
      prerequisite: prerequisiteFactory,
      certificate: certificateFactory,
      pricing: pricingFactory,
      faq: faqFactory,
      question: questionsFactory,
    },
    seeds(server) {
      /* eslint-disable */
      server.createList('category', 3);
      server.createList('coInstructor', 3);
      server.createList('main', 1);
      server.createList('access', 1);
      server.createList('prerequisite', 1);
      server.createList('certificate', 1);
      server.createList('pricing', 1);
      server.createList('faq', 1);
      server.createList('question', 40);

      server.create('course', { id: '1', name: 'first' });
      server.create('course', { id: '2', name: 'second' });
      server.create('course', { id: '3', name: 'third' });
      /* eslint-disable */
    },
    routes() {
      const apiUrl = process.env.REACT_APP_API_URL || window.lmsApiSettings.lmsUrl;
      this.urlPrefix = apiUrl;

      this.get('/categories', (schema) => {
        return schema.categories.all();
      });

      this.post('/categories', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.categories.create(attrs);
      });

      this.get('/co-instructor/:id', (schema, request) => {
        const id = request.params.id;
        return schema.coInstructors.find(id);
      });

      this.get('/co-instructors/', (schema) => {
        return schema.coInstructors.all();
      });

      this.get('/co-instructors/:label', (schema, request) => {
        const label = request.params.label;
        return schema.coInstructors.findBy({ label });
      });

      this.get('/edit-course/:id/settings/main', (schema) => {
        return schema.mains.all();
      });

      this.get('/edit-course/:id/settings/access', (schema) => {
        return schema.accesses.all();
      });

      this.get('/edit-course/:id/settings/certificate', (schema) => {
        return schema.certificates.all();
      });

      this.get('/edit-course/:id/settings/prerequisites', (schema) => {
        return schema.prerequisites.all();
      });

      this.get('/edit-course/:id/pricing', (schema) => {
        return schema.pricings.all();
      });

      this.get('/edit-course/:id/faq', (schema) => {
        return schema.faqs.all();
      });

      this.get('/questions', (schema) => {
        return schema.questions.all();
      }, { timing: 1000 });
      this.passthrough(`${apiUrl}/**`);
      this.passthrough(`${window.lmsApiSettings.wpUrl}/**`);
    },
  });
}
