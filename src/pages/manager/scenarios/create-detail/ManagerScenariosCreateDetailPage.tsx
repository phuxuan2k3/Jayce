import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useListFieldMutation } from "../../../../features/scenarios/apis/concrete/chronobreak.scenario-api";
import { Field } from "../../../../features/scenarios/types";
import paths from "../../../../router/paths";

interface ScenarioDetails {
  name: string;
  description: string;
  field_ids: number[];
}

const ManagerScenariosCreateDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [fieldList, setFieldList] = React.useState<Field[]>([]);

  const [listFieldMutation] = useListFieldMutation();
  React.useEffect(() => {
    const fetchFieldList = async () => {
      try {
        const response = await listFieldMutation({
          ids: [],
          sort_methods: [],
          page_index: 0,
          page_size: 1000,
        });
        setFieldList(response.data?.fields || []);
      } catch (error) {
        console.log("Error fetching fields", error);
      }
    };

    fetchFieldList();
  }, []);

  const [scenarioDetails, setScenarioDetails] = React.useState<ScenarioDetails>(
    location.state?.scenarioDetails || {
      name: "",
      description: "",
      field_ids: [],
    }
  );

  const [questionList, _setQuestionList] = React.useState(
    location.state?.questionList || []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setScenarioDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldSelection = (fieldId: number) => {
    setScenarioDetails((prev) => {
      const isSelected = prev.field_ids.includes(fieldId);
      return {
        ...prev,
        field_ids: isSelected
          ? prev.field_ids.filter((id) => id !== fieldId)
          : [...prev.field_ids, fieldId],
      };
    });
  };

  const handleNext = async () => {
    try {
      navigate(paths.manager.scenario.CREATE_QUESTIONS, {
        state: { scenarioDetails, questionList },
      });
    } catch (err: any) {
      console.error("Scenario Create Detail:", err);
    }
  };

  const handleCancel = () => {
    navigate(paths.manager.scenario._layout);
  };

  return (
    <>
      <div className="flex-grow flex flex-col items-center justify-center px-4 font-arya border-2 rounded-xl shadow-lg pb-8 mx-48">
        <div className="flex flex-col items-center justify-center mt-6 ml-16 text-center">
          <div className=" text-4xl font-bold">Create a new Scenario</div>
          <div className=" text-xl font-semibold pb-10">
            Fill some information for your scenario
          </div>
        </div>

        <div className="w-full max-w-7xl py-6 pt-10 space-y-6 items-center justify-center">
          <div className="flex justify-center space-x-4">
            <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
              Scenario Name
            </label>
            <input
              id="scenarioName"
              name="name"
              type="text"
              placeholder="Enter scenario's name"
              value={scenarioDetails.name}
              onChange={handleInputChange}
              className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
            />
          </div>
          <div className="flex justify-center space-x-4">
            <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
              Scenario Description
            </label>
            <textarea
              id="scenarioDescription"
              name="description"
              placeholder="Enter scenario's description"
              value={scenarioDetails.description}
              onChange={handleInputChange}
              className="h-36 w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
              Fields
            </label>
            <div className="w-2/4 flex flex-wrap gap-2 px-4 py-2 border border-[var(--primary-color)] rounded-md max-h-[200px] overflow-y-auto">
              {fieldList.map((field) => (
                <div
                  key={field.id}
                  className="w-fit flex items-center p-1 bg-[#EAF6F8] rounded-lg"
                >
                  <input
                    type="checkbox"
                    id={`field-${field.id}`}
                    checked={scenarioDetails.field_ids.includes(field.id)}
                    onChange={() => handleFieldSelection(field.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`field-${field.id}`} className="text-lg">
                    {field.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end gap-4 pe-24">
          <button
            onClick={handleCancel}
            className="mt-4 w-fit  font-semibold mr-3 rounded-lg py-2 px-8 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleNext}
            className="mt-4 w-fit font-semibold mr-3 rounded-lg py-2 px-9 bg-[var(--primary-color)] border-[var(--primary-color)] text-white border-2 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ManagerScenariosCreateDetailPage;
