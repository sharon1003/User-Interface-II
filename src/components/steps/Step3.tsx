import ColorPatternSelector from "../ColorPattern";
import CustomizeButton from "../CustomizeButton";

interface Step3Props {
  color: string;
  setColor: (color: string) => void;
  t: (key: string) => string;
  handleBack: () => void;
  handleNext: () => void;
}

const Step3 = ({ color, setColor, t, handleBack, handleNext }: Step3Props) => (
  <>
    <h2 className="text-xl font-semibold mb-2">{t("customize.step3")}</h2>
    <ColorPatternSelector selectedColor={color} onColorSelect={setColor} />
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

export default Step3;
