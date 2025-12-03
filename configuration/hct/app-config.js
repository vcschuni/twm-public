app.config = {
	title: {
		desktop: "Height Clearance Tool",
		mobile: "HCT"
	},
	meta: {
		description: "The Height Clearance Tool is an online application that allows commercial vehicle operators to generate and show the shortest route between two or more points and any known restrictions less than the height and/or width entered.",
		author: "BC Ministry of Transportation and Transit - Commercial Vehicle Safety and Enforcement"
	},
	version: 1.0,
	contact: {
		name: "Application Administrator",
		email: "IMBSpatial@gov.bc.ca"
	},
	overrideStyle: "app-style.css",
	overrideLogo: "app-logo.png",
	menuOptions: [
		{
			text: "Copyright",
			iconCls: "oi oi-globe",
			action: "link",
			url: "https://www.gov.bc.ca/com/copyright.html"
		},
		{
			text: "Disclaimer",
			iconCls: "oi oi-globe",
			action: "link",
			url: "https://www.gov.bc.ca/com/disclaimer.html"
		},
		{
			text: "Privacy",
			iconCls: "oi oi-globe",
			action: "link",
			url: "https://www.gov.bc.ca/com/privacy.html"
		},
		{
			text: "Accessibility",
			iconCls: "oi oi-globe",
			action: "link",
			url: "https://www.gov.bc.ca/com/accessibility.html"
		}
	],
	rememberState: false,
	allowSessionManagement: false,
	rewriteUrl: false,
	sidebar: {
		width: 600,
		openOnDesktopStart: true,
		openOnMobileStart: true
	},
	plugins: [
		{
			name: "Disclaimer",
			title: "Height Clearance Tool",
			acceptButtonText: "Accept &amp; Continue",
			hideButtons: true,
			enabled: true
		},
		{
			name: "RestrictionFinder",
			tabName: "Restriction Finder",
			enabled: true,
			allowWayPoints: true,
			visibleLayerSearchEnabled: true,
			visibleLayerSearchMaxResults: 30,
			geoCoderEnabled: true,
			geoCoderApiKey: "6097f62f6a8144edae53c59fc7c12351", // PRD MoTT API Key for DataBC GeoCoder
			geoCoderMaxResults: 7,
			routerApiKey: "6097f62f6a8144edae53c59fc7c12351", // PRD MoTT API Key for DataBC Router
			searchDistanceInMetres: 30,
			showSelectionBuffer: false,
			restrictionLayerUrl: returnEnvironmentUrl("ogs-public") + "/wfs",
			restrictionLayerName: "hwy:CSR_RESTRICTION_V",
			restrictionLayerGeometryFieldName: "GEOMETRY",
			restrictionLayerNativeEPSG: "4326"
		}
	],
	map: {
		default: {
			centre: {
				latitude: 54.5,
				longitude: -123.0
			},
			zoom: 5
		},
		zoom: {
			min: 4,
			max: 17
		},
		layers: [
			// Overlay Layers
			new ol.layer.Vector({
				title: "Border Crossings", // Required for the RestrictionFinder plugin to list border crossings
				hideFromLayerController: true,
				type: "overlay",
				visible: true,
				source: new ol.source.Vector({
					url: "data/border-crossings.json",
					format: new ol.format.GeoJSON()
				}),
				style: new ol.style.Style({
					image: new ol.style.Circle({
						radius: 1,
						stroke: new ol.style.Stroke({
							color: "rgba(0, 0, 0, 0)", // Make's it non-visible and non-identifiable
							width: 1
						})
					})
				}),  
				fields: [
					{
						name: "search",
						searchable: true,
						title: true
					}
				]
			}),
			
			// Base Layers
			new ol.layer.Tile({
				title: "ESRI Streets",
				type: "base",
				visible: true,
				source: new ol.source.XYZ({
					url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
					attributions: "Tiles © <a target='_blank' href='https://services.arcgisonline.com/ArcGIS/rest/services/'>ESRI</a>"
				})
			}),
			new ol.layer.Tile({
				title: "ESRI Imagery",
				type: "base",
				visible: false,
				source: new ol.source.XYZ({
					url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
					attributions: "Tiles © <a target='_blank' href='https://services.arcgisonline.com/ArcGIS/rest/services/'>ESRI</a>"
				})
			})
		]
	}
}