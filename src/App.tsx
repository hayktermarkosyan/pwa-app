import { useState } from "react";
// import Webcam from "react-webcam";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ChakraProvider,
  Container,
} from "@chakra-ui/react";

async function notifyUser(
  notificationText = "Thank you for enabling notifications!"
) {
  if (!("Notifications" in window)) {
    alert("Browser does not support notifications!");
  } else if (Notification.permission === "granted") {
    const notification = new Notification(notificationText);
  } else if (Notification.permission !== "denied") {
    await Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification(notificationText);
      }
    });
  }
}

function App() {
  // const webcamRef = useRef(null);
  // const [imgSrc, setImgSrc] = useState(null);
  const [userResponded, setUserResponded] = useState(false);

  async function enableNotifsAndClose() {
    await notifyUser().then(() => {
      setUserResponded(true);
    });
  }

  function disableNotifsAndClose() {
    setUserResponded(true);
  }

  // const capture = useCallback(() => {
  //   if (webcamRef.current) {
  //     const imageSrc = webcamRef.current.getScreenshot();
  //     setImgSrc(imageSrc);
  //   } else {
  //     console.warn("Webcam not initialized yet");
  //   }
  // }, [webcamRef]);

  // const retake = () => {
  //   setImgSrc(null);
  // };

  return !userResponded && !(Notification.permission === "granted") ? (
    <ChakraProvider>
      <Container>
        <Alert status="success">
          <AlertIcon />
          <Box>
            <AlertTitle>Notifications</AlertTitle>
            <AlertDescription>
              Would you like to enable notifications?
            </AlertDescription>
          </Box>
          <Button colorScheme="teal" size="sm" onClick={enableNotifsAndClose}>
            Sure!
          </Button>
          <Button colorScheme="gray" size="sm" onClick={disableNotifsAndClose}>
            No thanks!
          </Button>
        </Alert>
      </Container>
    </ChakraProvider>
  ) : Notification.permission === "granted" ? (
    <ChakraProvider>
      <Button
        colorScheme="gray"
        size="sm"
        onClick={() => notifyUser("Thank you!")}
      >
        Click to show a thank you
      </Button>
    </ChakraProvider>
  ) : (
    <ChakraProvider>
      <h1>You have disabled notifications</h1>
    </ChakraProvider>
  );
  // <div
  //   style={{
  //     display: "flex",
  //     flexDirection: "column",
  //     alignItems: "center",
  //     paddingTop: "2rem",
  //   }}
  // >
  //   {imgSrc ? (
  //     <img src={imgSrc} alt="webcam" width={"80%"} height={500} />
  //   ) : (
  //     <Webcam width={"80%"} height={500} ref={webcamRef} />
  //   )}
  //   <div>
  //     {imgSrc ? (
  //       <button onClick={retake}>Retake photo</button>
  //     ) : (
  //       <button onClick={capture}>Capture photo</button>
  //     )}
  //   </div>

  // </div>
}

export default App;
