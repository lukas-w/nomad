import Route from '@ember/routing/route';
import { collect } from '@ember/object/computed';
import {
  watchAll,
  watchRecord,
  watchQuery,
  watchRelationship,
} from 'nomad-ui/utils/properties/watch';
import WithWatchers from 'nomad-ui/mixins/with-watchers';
export default class VersionsRoute extends Route.extend(WithWatchers) {
  startWatchers(controller, model) {
    if (model) {
      controller.set('namespacesWatch', this.watchNamespaces.perform());
      controller.set('modelWatch', this.watchJobs.perform({ namespace: controller.jobNamespace }));
      controller.set('watcher', this.watch.perform(model));
      controller.set('watchVersions', this.watchVersions.perform(model));
    }
  }

  @watchAll('namespace') watchNamespaces;
  @watchRecord('job') watch;
  @watchQuery('job') watchJobs;
  @watchRelationship('versions') watchVersions;
  @collect('watch', 'watchJobs', 'watchVersions') watchers;
}
