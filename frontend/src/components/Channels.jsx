import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeChannel } from "../store/channelsSlice";
import getModal from "./modals/index";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";

const Channels = ({ channels, inputRef }) => {
  if (!channels && !channels.length) {
    return null;
  }
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const notify = (type, text) => toast[type](t(text));
  const currentChannelId = useSelector((state) => {
    const currentChannel = state.channels.currentChannel;
    if (currentChannel === null) {
      return null;
    }
    return currentChannel.id;
  });

  const handleChangeChannel = (channel) => {
    dispatch(changeChannel({ channel }));
  };

  const onHide = () => {
    setModalInfo({ type: null, item: null });
  };

  const renderModal = () => {
    const { type, item } = modalInfo;
    if (type === null) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal channel={item} onHide={onHide} notify={notify} />;
  };

  const channelClass = (id) => {
    const selectedChannel = id === currentChannelId ? " btn-secondary" : "";
    return `w-100 rounded-0 text-start btn${selectedChannel}`;
  };

  const showNonRemovableChannel = (ch) => {
    return (
      <button
        className={channelClass(ch.id)}
        onClick={() => handleChangeChannel(ch)}
      >
        # {ch.name}
      </button>
    );
  };

  const showRemovableChannel = (ch) => {
    return (
      <Dropdown as={ButtonGroup} className="w-100">
        <button
          className={channelClass(ch.id)}
          onClick={() => handleChangeChannel(ch)}
        >
          # {ch.name}
        </button>
        <Dropdown.Toggle
          split
          id="dropdown-split-basic"
          variant={ch.id === currentChannelId ? "secondary" : "light"}
        />
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => setModalInfo({ type: "removing", item: ch })}
          >
            {t("remove")}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setModalInfo({ type: "renaming", item: ch })}
          >
            {t("rename")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t("channels")}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => setModalInfo({ type: "adding", item: null })}
        >
          +
        </button>
        {renderModal()}
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((ch) => (
          <li key={ch.id} className="nav-item w-100">
            {ch.removable
              ? showRemovableChannel(ch)
              : showNonRemovableChannel(ch)}
          </li>
        ))}
      </ul>
      <ToastContainer />
    </>
  );
};

export { Channels };
