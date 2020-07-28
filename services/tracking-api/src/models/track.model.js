// track-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const modelName = 'track';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      userId: { type: String, required: true },
      inProgress: { type: Boolean, required: true },
      start: { type: Date, required: true },
      end: { type: Date },
      category: { type: String },
      project: { type: String, required: true },
      task: { type: String, required: true },
      requireDescription: { type: Boolean, required: true },
      description: { type: String },
      workRelated: { type: Boolean, required: true }
    },
    {
      timestamps: true
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
