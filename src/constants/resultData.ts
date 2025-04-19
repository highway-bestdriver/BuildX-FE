export const metrics = {
  accuracy: 0.74,
  precision: 0.68,
  recall: 0.72,
  f1_score: 0.7,
  auc_roc: 0.75,
  loss: 0.38,
};

export const feedback = `1. 분석:
MyCNN 모델의 성능은 0.74의 정확도와 0.38의 Loss로 나타나며, 과적합(overfitting)은 뚜렷하게 보이지 않습니다. 학습은 양호한 편이지만 여전히 개선 여지가 있습니다.

2. 구조 개선 팁:
- Convolutional Layer의 필터 수와 커널 사이즈를 조정하여 특징 추출을 강화하세요.
- MaxPooling 또는 Dropout Layer를 추가하여 Overfitting 방지 효과를 높일 수 있습니다.
- Dense Layer를 1~2개 추가하여 표현력을 높여보세요.

3. 하이퍼파라미터 추천:
- Epochs: 20~30
- Batch Size: 16~64
- Learning Rate: 0.0001~0.001

4. 추가 고려 가능한 레이어:
- Dropout Layer, BatchNormalization, Flatten, Conv2D Transpose 등

5. 원인 분석:
초기 구조 및 학습 파라미터는 기본적인 수준이나, 적절한 튜닝 및 레이어 조정으로 성능 개선이 가능합니다.
`;
