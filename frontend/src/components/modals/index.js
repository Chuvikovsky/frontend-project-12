import AddChannel from "./addChannel";
import RemoveChannel from "./removeChannel";

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: AddChannel,
};

export default (modalName) => modals[modalName];
