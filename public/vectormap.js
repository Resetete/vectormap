require('plugins/vectormap/vectormap.less');
require('plugins/vectormap/lib/vectormap_controller.js');
require('plugins/vectormap/lib/vectormap_directive.js');

function VectorMapProvider(Private) {
  var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
  var Schemas = Private(require('ui/Vis/Schemas'));

  return new TemplateVisType({
    name: 'vectormap',
    title: 'Vector map',
    description: 'Displays a map of shaded regions using a field containing a 2 letter country '+
       ', or US state, code. Regions with more hit are shaded darker. Node that this does use the'+
       ' Elasticsearch terms facet, so it is important that you set it to the correct field.',
    icon: 'fa-map',
    template: require('plugins/vectormap/vectormap.html'),
    params: {
      defaults: {
        mapType: 'world',
        colors: ['#A0E2E2', '#265656'],
        exclude: [],
        spyable: true
      },
      editor: require('plugins/vectormap/vectormap_vis_params.html')
    },
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Metric',
        min: 1,
        max: 1,
        aggFilter: ['avg', 'sum', 'count', 'min', 'max', 'median', 'cardinality'],
        defaults: [
          { schema: 'metric', type: 'count' }
        ]
      },
      {
        group: 'buckets',
        name: 'segment',
        icon: 'fa fa-map',
        title: 'Map code',
        min: 1,
        max: 1,
        aggFilter: ['terms', 'significant_terms']
      }
    ])
  });
}

require('ui/registry/vis_types').register(VectorMapProvider);
