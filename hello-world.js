looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  id: "single_value",
  label: "App - Single Value",
  options: {
  },
  // Set up the initial state of the visualization
  create: function(element, config) {

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        #dashboard-layout-wrapper {
            padding: 0 !important;
        }
        #vis {
            width: 100% !important;
            margin: 0px !important;
        }
        .viz-wrap {
            border: 1px solid red;
            display: flex;
            justify-items: start;
            justify-content: start;
            width: auto;
            height: auto;
        }
      </style>
    `;

    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"));
    container.className = "viz-wrap";

    // Create an element to contain the text.
    this._textElement = container.appendChild(document.createElement("div"));

  },
  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {

    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.measures.length == 0) {
      this.addError({title: "No Measures", message: "This chart requires measures."});
      return;
    }

    // Grab the first cell of the data
    var firstRow = data[0];
    var firstCell = firstRow[queryResponse.fields.measures[0].name];
    
    // Insert the data into the page
    this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);

    // We are done rendering! Let Looker know.
    done();
  }
});