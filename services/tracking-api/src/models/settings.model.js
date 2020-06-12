// settings-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const modelName = 'settings';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      userId: { type: String, required: true },
      workHours: [
        {
          day: { type: Number, required: true },
          startTime: { type: String, required: true },
          endTime: { type: String, required: true }
        }
      ],
      sleepHours: [
        {
          day: { type: Number, required: true },
          startTime: { type: String, required: true },
          endTime: { type: String, required: true }
        }
      ],
      breakIntervals: {
        duringWorkHours: { type: Number, required: true },
        afterWorkHours: { type: Number },
        other: [
          {
            day: { type: Number, required: true },
            startTime: { type: Number, required: true },
            endTime: { type: Number, required: true },
            interval: { type: Number, required: true }
          }
        ]
      },
      projectCategories: [
        {
          categoryDescription: { type: String, required: true },
          workRelated: { type: Boolean, required: true }
        }
      ]
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
