require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GroupLayer",
    "esri/widgets/Expand",
    "esri/widgets/Home",
    "esri/widgets/Fullscreen",
    "esri/widgets/Locate",
    "esri/widgets/LayerList",
    "esri/widgets/BasemapToggle",
    "esri/widgets/TimeSlider",
    "esri/widgets/Search",
    "esri/core/urlUtils",
    "esri/core/reactiveUtils",
    "esri/intl"
  ], (
    Map,
    MapView,
    FeatureLayer,
    GroupLayer,
    Expand,
    Home,
    Fullscreen,
    Locate,
    LayerList,
    BasemapToggle,
    TimeSlider,
    Search,
    urlUtils,
    reactiveUtils,
    intl
  ) => {
    intl.setLocale("th");

    const urlGreenNews = "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/GreenNews/FeatureServer/0";

    // define a popup for News layer
    const popupGreenNews = {
      title: "<b>{TITLE}</b>",
      content:
        "<b>ประเภทข่าว: {CATEGORY} ({DATE})</b><br><br>{DETAIL}<br><br><img src={IMAGE}><br><br><a href={LINK} target='_blank'>อ่านข่าวเพิ่มเติม</a>"
    };

    // add layer
    const GreenNewsLayer = new FeatureLayer({
      url: urlGreenNews,
      title: "ข้อมูลข่าวแบบ Timeline",
      outFields: ["*"],
      popupTemplate: popupGreenNews,
      listMode: "hide",
      visible: false
    });
    const Mining = new FeatureLayer({
      url: "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/Mining/FeatureServer/0",
      title: "ประเภทข่าวที่ 11",
      popupTemplate: popupGreenNews
    });
    const Pollution = new FeatureLayer({
      url: "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/Pollution_and_waste/FeatureServer/0",
      title: "ประเภทข่าวที่ 10",
      popupTemplate: popupGreenNews
    });
    const Industrial = new FeatureLayer({
      url: "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/Industrial/FeatureServer/0",
      title: "ประเภทข่าวที่ 9",
      popupTemplate: popupGreenNews
    });
    const Food = new FeatureLayer({
      url: "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/Food_and_Agriculture/FeatureServer/0",
      title: "ประเภทข่าวที่ 8",
      popupTemplate: popupGreenNews
    });
    const Energy = new FeatureLayer({
      url: "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/Energy/FeatureServer/0",
      title: "ประเภทข่าวที่ 7",
      popupTemplate: popupGreenNews
    });
    const Right = new FeatureLayer({
      url: "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/Right/FeatureServer/0",
      title: "ประเภทข่าวที่ 6",
      popupTemplate: popupGreenNews
    });
    const Urban = new FeatureLayer({
      url: "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/Urban/FeatureServer/0",
      title: "ประเภทข่าวที่ 5",
      popupTemplate: popupGreenNews
    });
    const Forest = new FeatureLayer({
      url: "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/FOREST_AND_WILDIFE/FeatureServer/0",
      title: "ประเภทข่าวที่ 4",
      popupTemplate: popupGreenNews
    });
    const Ocean = new FeatureLayer({
      url: "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/WATER_AND_OCEAN/FeatureServer/0",
      title: "ประเภทข่าวที่ 3",
      popupTemplate: popupGreenNews
    });
    const Ecology = new FeatureLayer({
      url: "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/Ecology/FeatureServer/0",
      title: "ประเภทข่าวที่ 2",
      popupTemplate: popupGreenNews
    });

    const Disaster = new FeatureLayer({
      url: "https://services5.arcgis.com/60ZyqBuk6DAAkHuh/ArcGIS/rest/services/DISASTER/FeatureServer/0",
      title: "ประเภทข่าวที่ 1",
      popupTemplate: popupGreenNews
    });

    // create group layer
    const GreenNews = new GroupLayer({
      title: "เลือกทุกประเภทข่าว",
      visible: true,
      visibilityMode: "independent",
      layers: [
        Mining,
        Pollution,
        Industrial,
        Food,
        Energy,
        Right,
        Urban,
        Forest,
        Ocean,
        Ecology,
        Disaster
      ]
    });

    // create the Map with an initial basemap
    const map = new Map({
      basemap: "gray-vector",
      layers: [GreenNewsLayer, GreenNews]
    });

    // create the MapView and reference the Map in the instance
    const view = new MapView({
      container: "viewDiv",
      map: map,
      highlightOptions: {
        color: "#87AF4A", //https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#highlightOptions
      },     
      popup: {
        dockEnabled: true,
        //https://community.esri.com/thread/245768-popup-functionality-in-mobile-view
        collapseEnabled: false,
        dockOptions: {
          // Disables the dock button from the popup
          buttonEnabled: true,
          // Ignore the default sizes that trigger responsive docking
          breakpoint: false
        }
      },
      center: [100.534175, 13.769469], // lon, lat
      zoom: 5
    });

    view.constraints = {
      minZoom: 4
    };

    // remove default zoom widget
    view.ui.remove("zoom");

    // add logo
    view.ui.add("logoDiv", "top-left");

    popup = view.popup;
    popup.visibleElements = {
      closeButton: true
    };
    
    // add facebook share button to popup
    const shareFacebook = {
      title: "แชร์",
      id: "share-facebook",
      image: "images/facebook.png"
    };
    view.popup.actions.push(shareFacebook);
    
    // add twitter share button to popup
    const shareTwitter = {
      title: "ทวิต",
      id: "share-twitter",
      image: "images/twitter.png"
    };
    view.popup.actions.push(shareTwitter);

    popup.viewModel.on("trigger-action", function(event) {
      if (event.action.id === "share-facebook") {
        const info = popup.viewModel.selectedFeature;
        if (info === null) {
          window.open("https://www.facebook.com/sharer/sharer.php?u=" + window.location.href);
        } else {
          window.open("https://www.facebook.com/sharer/sharer.php?u=" + window.location.href + "?id=" + info.attributes.OBJECTID);;
        }
      }

      if(event.action.id === "share-twitter"){
        const info = popup.viewModel.selectedFeature;
        if (info === null) {
          window.open("https://twitter.com/intent/tweet?text=" + "แผนที่สำนักข่าวสิ่งแวดล้อม โดยชมรมนักข่าวสิ่งแวดล้อม" + "%2C&amp&url=" + window.location.href);
        } else {
          window.open("https://twitter.com/intent/tweet?text=" + info.attributes.TITLE + "%2C&amp&url=" + window.location.href + "?id=" + info.attributes.OBJECTID);
        }  
      }

    });

    // create home button
    const homeBtn = new Home({
      view: view
    });
    // add the home button
    view.ui.add(homeBtn, "top-left");
    
    // create full screen button
    const fullscreenBtn = new Fullscreen({
      view: view
    });
    // add full screen button
    view.ui.add(fullscreenBtn, "top-left");

    // ceate locate button
    const locateBtn = new Locate({
      view: view
    });
    // add the locate button
    view.ui.add(locateBtn, "bottom-left");

    // create layerList
    const layerList = new LayerList({
      view: view,
      listItemCreatedFunction: function (event) {
        const item = event.item;
        if (item.layer.type != "group") {
          // don't show legend twice
          item.panel = {
            content: "legend",
            open: true
          };
        }
      }
    });

    layerListExpand = new Expand({
      expandIconClass: "esri-icon-layer-list", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
      expandTooltip: "ชั้นข้อมูลข่าวตามประเภท",
      collapseTooltip: "ปิด",
      group: "top-left",
      view: view,
      content: layerList
    });
    // add layer list
    view.ui.add(layerListExpand, "top-left");

    // create basemap toggle
    const toggle = new BasemapToggle({
      view: view,
      nextBasemap: "hybrid" 
    });
    toggle.visibleElements = {
      title: true
    };

    // add basemap toggle
    view.ui.add(toggle, "bottom-right");

    // Create a time slider 
    const timeSlider = new TimeSlider({
      container: "timeSlider",
      mode: "cumulative-from-start",
      disabled: false
    });

    // wait until the layer view is loaded
    let timeLayerView;
    view.whenLayerView(GreenNewsLayer).then(function (layerView) {
      timeLayerView = layerView;
      const fullTimeExtent = GreenNewsLayer.timeInfo.fullTimeExtent;
      const start = fullTimeExtent.start;

      // set up time slider properties based on layer timeInfo
      timeSlider.fullTimeExtent = fullTimeExtent;
      timeSlider.values = [start];
    });

    timeSlider.watch("timeExtent", function (value) {
      // update layer view filter to reflect current timeExtent
      timeLayerView.filter = {
        timeExtent: value
      };
    });

    const timeExpand = new Expand({
      expandIconClass: "esri-icon-sliders-horizontal",
      expandTooltip: "กรองข่าวตามช่วงเวลา",
      view: view,
      group: "top-left",
      content: timeSlider.container,
      expanded: false
    });
    view.ui.add(timeExpand, "top-left");

    const searchWidget = new Search({
      view: view,
      allPlaceholder: "ค้นหาข่าว",
      includeDefaultSources: false,
      locationEnabled: false,
      maxSuggestions: 10,
      searchAllEnabled: false,
      sources: [
        {
          layer: GreenNewsLayer,
          searchFields: ["DETAIL"],
          displayField: "DETAIL",
          exactMatch: false,
          outFields: ["DETAIL"],
          name: "GreenNews",
          placeholder: "ค้นหาข่าว",
          zoomScale: 500000
        }
      ]
    });

    const searchExpand = new Expand({
      expandIconClass: "esri-icon-search",
      expandTooltip: "ค้นหาข่าว",
      view: view,
      group: "top-left",
      content: searchWidget,
      expanded: false
    });
    view.ui.add(searchExpand, "top-left");

    reactiveUtils.watch(
      () => timeExpand.expanded,
      (isExpanded) => {
        GreenNewsLayer.visible = isExpanded;
        GreenNews.visible = !isExpanded;
      }
     );
    
    // responsive widgets
    view.watch("widthBreakpoint", function(newValue) {
      if (newValue === "xsmall") {
        view.ui.remove(timeExpand);
        view.ui.move(locateBtn, "top-left");
        document.querySelector("#logoDiv").classList.add("invisible");
      } else {
        view.ui.add(timeExpand, "top-left");
        view.ui.move(locateBtn, "bottom-left");
        document.querySelector("#logoDiv").classList.remove("invisible")
      }
    });

    // Load
    isResponsiveSize = view.widthBreakpoint === "xsmall";
    updateView(isResponsiveSize);

    function updateView(isMobile) {
      setTitleMobile(isMobile);
    }

    function setTitleMobile(isMobile) {
      if (isMobile) {
        document.querySelector("#logoDiv").classList.add("invisible");
      } else {
        document.querySelector("#logoDiv").classList.remove("invisible");
      }
    }

    view.when(function () {
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-core-urlUtils.html#urlToObject
      const urlObject = urlUtils.urlToObject(document.location.href);

      const loc = window.location.href;
      const dir = loc.substring(0, loc.lastIndexOf('/'));

      if (urlObject.query) {
        queryFeatures(urlObject.query.id);
      } else {
        popup.open({
        title: "คลิกบนแผนที่เพื่อเลือกดูรายละเอียดข่าวที่สนใจ",
        content:
          "<img src=" + dir + "/images/helpInfo.png" + ">"
      });
      }
    });

    function queryFeatures(objectID) {
      GreenNewsLayer
        .queryFeatures({
          where: "OBJECTID = " + (objectID),
          returnGeometry: true,
          outFields: ["*"]
        })
        .then(function (response) {
          const textDate = new Date(response.features[0].attributes.DATE);
          view.popup.open({
            title: response.features[0].attributes.TITLE,
            content: response.features[0].attributes.CATEGORY + " (" +textDate.toLocaleDateString() + ")" +
            "<br><br>" + response.features[0].attributes.DETAIL +
            "<br><br><img src=" + response.features[0].attributes.IMAGE + 
            "><br><br><a target='_blank' href=" + response.features[0].attributes.LINK + ">อ่านข่าวเพิ่มเติม</a>"
          });
          view.goTo({
            center: response.features[0].geometry,
            zoom: 12
          });
        });
    }
  });