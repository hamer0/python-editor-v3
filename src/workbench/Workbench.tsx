import { useState } from "react";
import {
  Bottom,
  BottomResizable,
  Fill,
  LeftResizable,
  ViewPort,
} from "react-spaces";
import { ConnectionStatus } from "../device/device";
import { useConnectionStatus } from "../device/device-hooks";
import EditorArea from "../editor/EditorArea";
import { MAIN_FILE } from "../fs/fs";
import ProjectActionBar from "../project/ProjectActionBar";
import SerialArea from "../serial/SerialArea";
import LeftPanel from "./LeftPanel";

/**
 * The main app layout with resizable panels.
 */
const Workbench = () => {
  const [filename, setFilename] = useState(MAIN_FILE);
  const serialVisible = useConnectionStatus() === ConnectionStatus.CONNECTED;
  return (
    // https://github.com/aeagle/react-spaces
    <ViewPort>
      <Fill>
        <LeftResizable
          size="30%"
          minimumSize={210}
          style={{ borderRight: "4px solid whitesmoke" }}
        >
          <LeftPanel onSelectedFileChanged={setFilename} />
        </LeftResizable>
        <Fill>
          <Fill>
            <EditorArea
              key={filename}
              filename={filename}
              onSelectedFileChanged={setFilename}
            />
            <BottomResizable
              size={serialVisible ? "40%" : "0%"}
              style={{ borderTop: "4px solid whitesmoke" }}
            >
              {/* For accessibility. 
                Using `display` breaks the terminal height adjustment */}
              <SerialArea visibility={serialVisible ? "unset" : "hidden"} />
            </BottomResizable>
          </Fill>
          <Bottom size={58}>
            <ProjectActionBar
              pt={1}
              pb={1}
              pl={2}
              pr={2}
              borderTop="1px solid #d3d3d3"
            />
          </Bottom>
        </Fill>
      </Fill>
    </ViewPort>
  );
};

export default Workbench;
