import {
  Box,
  Typography,
  Container,
  FormHelperText,
  Paper,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ButtonComponent from "../../components/button/Button";
import Dropdown from "../../components/dropdown/Dropdown";
import SearchInput from "../../components/searchInput/SearchInput";
import Modules from "./modules/Modules";
import { style } from "./style";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchModuleData,
  fetchLessonModuleData,
  fetchUsageStatus,
} from "../../redux/actions/modulesData/moduleDataAction";

import { viewLessonData } from "../../redux/actions/viewLessonAction/viewLessonAction";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { cleanUpDataAction } from "../../redux/actions/cleanUpData/cleanUpData";
import { routeDataAction } from "../../redux/actions/routesData/routesDataAction";
import { purgeCache } from "../../utils/aiCacheService";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.persistData?.moduleData?.data);
  const searchData = useSelector(
    (state) => state?.persistData?.moduleData?.searchData
  );
  const userData = useSelector(
    (state) => state.persistData.loginData.isLoggedIn
  );
  const loading = useSelector((state) => state.loadingReducer.isLoading);
  const usage = useSelector(
    (state) => state?.persistData?.moduleData?.usage
  );
  const usageBlocked = usage?.blocked ?? false;

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [scrollToModules, setScrollToModules] = useState(false);
  const modulesRef = useRef(null);
  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      generateHandler();
    }
  }

  useEffect(() => {
    if (scrollToModules && data?.length > 0) {
      setScrollToModules(false);
      requestAnimationFrame(() => {
        modulesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [scrollToModules, data]);

  useEffect(() => {
    dispatch(cleanUpDataAction());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(fetchUsageStatus());
  }, [userData]);

  const [options, setOptions] = useState({
    levels: "",
    languages: "",
  });

  const generateHandler = async () => {
    dispatch(routeDataAction(""));

    const payload = {
      topic: search,
      level: options.levels,
      language: options.languages,
    };
    if (!search || !options.levels || !options.languages) {
      setError("Please enter all inputs.");
    } else {
      purgeCache({ topic: search });
      setError("");
      const success = await dispatch(fetchModuleData(payload));
      if (success) {
        setScrollToModules(true);
      }
    }
  };

  const viewLessonButtonHandler = (data, index) => {
    dispatch(viewLessonData(data));
    purgeCache({ topic: searchData.topic, module: data });
    navigate(`/lesson/${index}/${data.toLowerCase()}`);
    const payload = {
      module_name: data,
      level: searchData.level,
      language: searchData.language,
      topic: searchData.topic,
    };
    dispatch(fetchLessonModuleData(payload));
  };

  const dropdownOnChnageHandler = (e) => {
    const { name, value } = e.target;
    setOptions({
      ...options,
      [name]: value,
    });
  };

  const level = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "mandarin", label: "Mandarin" },
    { value: "hindi", label: "Hindi" },
    { value: "french", label: "French" },
    { value: "arabic", label: "Arabic" },
    { value: "bengali", label: "Bengali" },
    { value: "portuguese", label: "Portuguese" },
    { value: "german", label: "German" },
    { value: "japanese", label: "Japanese" },
  ];

  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <>
          {loading && (
            <LoadingSpinner
              message={`Generating modules for: \n${search.charAt(0).toUpperCase() + search.slice(1)}.`}
              message2={`Don't leave this page for a few seconds.`}
            />
          )}
        </>
      </Box>
      <Box sx={style.root}>
        <Typography variant="h1" sx={{ lineHeight: "40px" }}>
          fluide
        </Typography>
        <Typography variant="h3" sx={style.gradientText}>
          Accelerate your learning with adaptive education
        </Typography>
        <Box sx={style.subContainer}>
          <SearchInput
            error={error}
            onKeyDown={handleKeyDown}
            onChange={searchChangeHandler}
            placeholder="Enter a topic of your choice"
          />
          <Dropdown
            defaultOption="Select Level"
            options={level}
            onChange={dropdownOnChnageHandler}
            selectedValue={options.levels}
            name="levels"
          />
          <Dropdown
            defaultOption="Select Language"
            options={languages}
            onChange={dropdownOnChnageHandler}
            name="languages"
            selectedValue={options.languages}
            disabledOptions={[
              "spanish",
              "mandarin",
              "hindi",
              "french",
              "arabic",
              "bengali",
              "portuguese",
              "german",
              "japanese",
            ]}
          />
        </Box>

        {error && (
          <FormHelperText
            sx={{
              color: "red",
              margin: {
                xs: "-1rem 1rem",
                sm: "0 0 0 14rem",
                md: "-1.5rem 1rem",
              },
            }}
          >
            <Typography variant="h5">{error}</Typography>
          </FormHelperText>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <ButtonComponent
            onClick={generateHandler}
            disabled={usageBlocked}
          >
            Generate Modules
          </ButtonComponent>
          <Typography variant="h6" sx={{ fontStyle: "italic" }}>
            Hint: Your topic can be as broad or as specific as you want.
          </Typography>
          {usageBlocked && (
            <Box elevation={0} sx={{ padding: "1rem" }}>
              <Typography variant="h4">
                {userData
                  ? (usage?.message ||
                    "You have exceeded the maximum number of generation attempts.")
                  : (
                    <>
                      You have exceeded the maximum number of attempts. Please{" "}
                      <span
                        type="button"
                        onClick={() => navigate("/login")}
                        style={{
                          color: "#6C8EA5",
                          cursor: "pointer",
                        }}
                      >
                        log in{" "}
                      </span>
                      to continue.
                    </>
                  )}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ marginTop: "2rem", scrollMarginTop: "1.5rem" }} ref={modulesRef}>
          {data?.length > 0 && (
            <Modules
              data={data}
              onClick={viewLessonButtonHandler}
              type="description"
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
