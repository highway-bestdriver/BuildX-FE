import model_img1 from "@assets/images/model_img1.png";
import model_img2 from "@assets/images/model_img2.png";
import model_img3 from "@assets/images/model_img3.png";
import model_img4 from "@assets/images/model_img4.png";
import model_img6 from "@assets/images/model_img6.png";
import model_img7 from "@assets/images/model_img7.png";

export const projectsData = [
  {
    id: 1,
    name: "ResNet",
    last_modified: "2024.02.27",
    thumbnail: model_img4,
  },
  {
    id: 2,
    name: "GoogLeNet",
    last_modified: "2024.03.02",
    thumbnail: model_img3,
  },
  {
    id: 3,
    name: "MobileNet",
    last_modified: "2024.03.03",
    thumbnail: model_img6,
  },
  {
    id: 4,
    name: "EfficientNet",
    last_modified: "2024.03.24",
    thumbnail: model_img7,
  },
  {
    id: 5,
    name: "Transformer",
    last_modified: "2024.04.05",
    thumbnail: model_img2,
  },
  {
    id: 6,
    name: "UNet",
    last_modified: "2024.04.10",
    thumbnail: model_img1,
  },
];

export const projectDetailData = [
  {
    id: 1,
    name: "ResNet",
    date: "2024.02.27",
    details: [
      {
        id: 1,
        epoch: 50,
        batch_size: 32,
        learning_rate: 0.001,
        loss: 20,
        accuracy: 85.5,
        date: "2024.02.12",
      },
      {
        id: 2,
        epoch: 100,
        batch_size: 64,
        learning_rate: 0.0005,
        loss: 15,
        accuracy: 88.0,
        date: "2024.02.13",
      },
      {
        id: 3,
        epoch: 150,
        batch_size: 32,
        learning_rate: 0.0001,
        loss: 12,
        accuracy: 89.7,
        date: "2024.02.13",
      },
      {
        id: 4,
        epoch: 200,
        batch_size: 16,
        learning_rate: 0.0001,
        loss: 10,
        accuracy: 91.2,
        date: "2024.02.25",
      },
      {
        id: 5,
        epoch: 250,
        batch_size: 64,
        learning_rate: 0.00005,
        loss: 8,
        accuracy: 92.8,
        date: "2024.02.26",
      },
      {
        id: 6,
        epoch: 300,
        batch_size: 32,
        learning_rate: 0.00001,
        loss: 7,
        accuracy: 93.4,
        date: "2024.02.27",
      },
    ],
  },
  {
    id: 2,
    name: "GoogLeNet",
    date: "2024.03.02",
    details: [
      {
        id: 1,
        epoch: 100,
        batch_size: 64,
        learning_rate: 0.0003,
        loss: 18,
        accuracy: 87.2,
        date: "2024.03.01",
      },
      {
        id: 2,
        epoch: 200,
        batch_size: 32,
        learning_rate: 0.0001,
        loss: 11,
        accuracy: 90.6,
        date: "2024.03.02",
      },
    ],
  },
  {
    id: 3,
    name: "MobileNet",
    date: "2024.03.03",
    details: [
      {
        id: 1,
        epoch: 75,
        batch_size: 32,
        learning_rate: 0.001,
        loss: 14,
        accuracy: 86.3,
        date: "2024.03.02",
      },
      {
        id: 2,
        epoch: 150,
        batch_size: 64,
        learning_rate: 0.0005,
        loss: 9,
        accuracy: 89.5,
        date: "2024.03.03",
      },
    ],
  },
  {
    id: 4,
    name: "EfficientNet",
    date: "2024.03.24",
    details: [
      {
        id: 1,
        epoch: 120,
        batch_size: 16,
        learning_rate: 0.0002,
        loss: 10,
        accuracy: 91.0,
        date: "2024.03.24",
      },
    ],
  },
  {
    id: 5,
    name: "Transformer",
    date: "2024.04.05",
    details: [
      {
        id: 1,
        epoch: 60,
        batch_size: 32,
        learning_rate: 0.0007,
        loss: 13,
        accuracy: 87.8,
        date: "2024.04.04",
      },
      {
        id: 2,
        epoch: 120,
        batch_size: 64,
        learning_rate: 0.0003,
        loss: 9,
        accuracy: 90.1,
        date: "2024.04.05",
      },
      {
        id: 3,
        epoch: 180,
        batch_size: 32,
        learning_rate: 0.0001,
        loss: 6,
        accuracy: 93.9,
        date: "2024.04.05",
      },
    ],
  },
  {
    id: 6,
    name: "UNet",
    date: "2024.04.10",
    details: [
      {
        id: 1,
        epoch: 80,
        batch_size: 16,
        learning_rate: 0.001,
        loss: 12,
        accuracy: 89.0,
        date: "2024.04.09",
      },
      {
        id: 2,
        epoch: 160,
        batch_size: 32,
        learning_rate: 0.0005,
        loss: 8,
        accuracy: 92.2,
        date: "2024.04.10",
      },
    ],
  },
];
