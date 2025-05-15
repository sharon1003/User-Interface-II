import CustomizeButton from "../CustomizeButton";

interface Step5Props {
  shape: string;
  length: string;
  color: string;
  totalPrice: number;
  t: (key: string) => string;
  handleBack: () => void;
  handleDownload: () => void;
  handleSubmit: () => void;
}

const Step5 = ({
  shape,
  length,
  color,
  totalPrice,
  t,
  handleBack,
  handleDownload,
  handleSubmit,
}: Step5Props) => (
  <>
    <h2 className="text-xl font-semibold mb-2">{t("customize.step5")}</h2>
    <p>
      <strong>{t("customize.shape")}:</strong> {shape}
    </p>
    <p>
      <strong>{t("customize.length")}:</strong> {length}
    </p>
    <p>
      <strong>{t("customize.color")}:</strong>{" "}
      <span style={{ color }}>{color}</span>
    </p>
    <p>
      <strong>{t("customize.price")}:</strong> ${totalPrice.toFixed(2)}
    </p>
    <div className="mt-4 text-center">
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {t("customize.savePreview")}
      </button>
    </div>
    <div className="mt-6 flex justify-between">
      <CustomizeButton
        onClick={handleBack}
        soundSrc="/sounds/back.wav"
        className="border"
      >
        {t("customize.back")}
      </CustomizeButton>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {t("customize.submit")}
      </button>
    </div>
  </>
);

export default Step5;
