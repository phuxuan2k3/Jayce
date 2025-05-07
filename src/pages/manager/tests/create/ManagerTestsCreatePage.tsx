import { useNavigate } from "react-router-dom";
import TestCreateStepper from "./Steps/TestCreateStepper";
import paths from "../../../../router/paths";
import { TestPersistProvider } from "../../../../features/tests/reducers/test-persist.context";
import { TestCreateTabProvider } from "./contexts/test-create-tab.context";
import ManagerTestsCreateMain from "./ManagerTestsCreateMain";

const ManagerTestsCreatePage = () => {
	const navigate = useNavigate();

	return (
		<TestPersistProvider>
			<TestCreateTabProvider>
				<div className="relative flex flex-col items-center justify-center w-full min-h-screen">
					<TestCreateStepper />

					<ManagerTestsCreateMain />

					<div className="absolute top-10 right-10">
						<img
							className="w-4 cursor-pointer"
							src="https://cdn-icons-png.flaticon.com/512/566/566013.png"
							alt="X"
							onClick={() => navigate(paths.manager.tests.ROOT)}
							title="Close"
						/>
					</div>
				</div>
			</TestCreateTabProvider>
		</TestPersistProvider>
	);
}

export default ManagerTestsCreatePage;