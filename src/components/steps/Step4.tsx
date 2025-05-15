import SelectPicture from "../SelectPicture";
import CustomizeButton from "../CustomizeButton";

interface Step4Props {
  t: (key: string) => string;
  handleBack: () => void;
  handleNext: () => void;
}

const Step4 = ({ t, handleBack, handleNext }: Step4Props) => (
  <>
    <h2 className="text-xl font-semibold mb-2">{t("customize.step4")}</h2>
    <p className="text-sm text-gray-500 mb-4 text-center">
      {t("customize.stickersHelper.prefix")}{" "}
      <strong>{t("customize.stickersHelper.drag")}</strong>{" "}
      {t("customize.stickersHelper.middle")}{" "}
      <strong>{t("customize.stickersHelper.doubleClick")}</strong>{" "}
      {t("customize.stickersHelper.suffix")}
    </p>
    <SelectPicture />
    <div className="mt-6 flex justify-between">
      <CustomizeButton
        onClick={handleBack}
        soundSrc="/sounds/back.wav"
        className="border"
      >
        {t("customize.back")}
      </CustomizeButton>
      <CustomizeButton
        onClick={handleNext}
        soundSrc="/sounds/next.wav"
        className="bg-black text-white"
      >
        {t("customize.next")}
      </CustomizeButton>
    </div>
  </>
);

export default Step4;
