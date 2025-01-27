import mongoose from "mongoose";

const { Schema } = mongoose;

const characterSchema = new Schema({
  // define fields here matching GraphQL schema
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  level: {
    type: Number,
    required: [true, "Level is required."],
  },
  race: {
    type: String,
    required: [true, "Race is required."],
  },
  class: {
    type: String,
    required: [true, "Class is required."],
  },

});

const CharacterModel = mongoose.models.characterModel || mongoose.model("characters", characterSchema);

export default CharacterModel;
