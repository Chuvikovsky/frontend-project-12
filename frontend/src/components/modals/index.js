import AddChannel from "./addChannel";
import RemoveChannel from "./removeChannel";
import RenameChannel from "./renameChannel";

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

export default (modalName) => modals[modalName];
