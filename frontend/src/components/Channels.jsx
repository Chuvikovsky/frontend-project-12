import React from "react";
import { useSelector } from "react-redux";

const Channels = ({ channels }) => {
  if (!channels && !channels.length) {
    return null;
  }
  const currectChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );
  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Channels</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <b>+</b>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((ch) => (
          <li key={ch.id} className="nav-item w-100">
            <button
              type="button"
              className={`w-100 rounded-0 text-start btn ${
                Number(ch.id) === Number(currectChannelId)
                  ? "btn-secondary"
                  : ""
              }`}
            >
              {ch.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export { Channels };
