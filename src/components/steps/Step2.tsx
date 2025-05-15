import { LengthSelector } from "../LengthSelector";
import CustomizeButton from "../CustomizeButton";

interface Step2Props {
  length: "short" | "medium" | "long";
  handleLengthChange: (length: "short" | "medium" | "long") => void;
  t: (key: string) => string;
  handleBack: () => void;
  handleNext: () => void;
}

const Step2 = ({
  length,
  handleLengthChange,
  t,
  handleBack,
  handleNext,
}: Step2Props) => (
  <>
    <h2 className="text-xl font-semibold mb-2">{t("customize.step2")}</h2>
    <LengthSelector selected={length} onSelect={handleLengthChange} />
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

export default Step2;
