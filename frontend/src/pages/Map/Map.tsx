import React, { useEffect, useState } from "react";
import Layout from "../../hoc/Layout";
import SvgMap from "svgmap";
import "svgmap/dist/svgMap.min.css";
import "./Map.scss";
import { useNavigate } from "react-router-dom";
import countries from "../../assets/countries";
import axios from "axios";

interface IMap {}

const Map: React.FC<IMap> = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/countries`).then((response) => {
      console.log(response?.data?.values);
      setValues(response?.data?.values);
    });
  }, []);

  useEffect(() => {
    if (values !== null) {
      new SvgMap({
        targetElementID: "svgMap",
        showZoomReset: true,
        flagType: "emoji",
        noDataText: "There are no posts yet :(",
        data: {
          data: {
            albums: {
              name: "Albums:",
              format: "{0} albums",
              thousandSeparator: " ",
            },
          },
          applyData: "albums",
          values: values,
        },
      });

      const handleClick = (event: any) => {
        event.preventDefault();
        const country: string = event.target.id.substring(
          event.target.id.length - 2
        );
        // @ts-ignore
        navigate(`/library?tag=${countries[country]}`);
      };

      for (let key of Object.keys(values)) {
        const country: HTMLElement | null = document.getElementById(
          `svgMap-map-country-${key}`
        );
        if (values[key]["albums"] > 0) {
          country?.addEventListener("click", handleClick);
        }
      }

      return () => {
        const svgMap: HTMLElement | null = document.getElementById("svgMap");
        svgMap?.children[0].remove();

        if (values !== null) {
          for (let key of Object.keys(values)) {
            const country: HTMLElement | null = document.getElementById(
              `svgMap-map-country-${key}`
            );
            country?.removeEventListener("onclick", handleClick);
          }
        }

        const svgToolTip: HTMLCollectionOf<Element> | null =
          document.getElementsByClassName("svgMap-tooltip");
        for (let i = 0; i < svgToolTip.length; i++) {
          svgToolTip[i].remove();
        }
      };
    }
  }, [values]);

  return (
    <Layout isFooterVisible={false}>
      <div id="svgMap"></div>
    </Layout>
  );
};

export default Map;
