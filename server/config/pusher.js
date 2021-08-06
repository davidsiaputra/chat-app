import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1245424",
  key: "474c37c4f9b392bf35fa",
  secret: "ca331c98c207810bc1a1",
  cluster: "us3",
  useTLS: true,
});

export default pusher;
