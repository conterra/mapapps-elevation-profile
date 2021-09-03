/*
 * Copyright (C) 2021 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import ElevationProfile from "esri/widgets/ElevationProfile";
import EsriDijit from "esri-widgets/EsriDijit";
import ct_util from "ct/ui/desktop/util";
import async from "apprt-core/async";

export default class ElevationProfileWidgetController {

    #elevationProfileWidget = null;
    #serviceRegistration = null;
    #bundleContext = null;
    #tool = null;

    activate(componentContext) {
        this.#bundleContext = componentContext.getBundleContext();
    }

    deactivate() {
        this._destroyWidget();
    }

    onToolActivated(evt) {
        this.#tool = evt.tool;
        this._getView().then((view) => {
            const widget = this.getWidget(view);
            widget.own({
                remove() {
                    widget.destroy();
                }
            });
            this._showWindow(widget);
        });
    }

    onToolDeactivated() {
        this._hideWindow();
    }

    _showWindow(widget) {
        const serviceProperties = {
            "widgetRole": "elevationProfileWidget"
        };
        const interfaces = ["dijit.Widget"];
        const content = new EsriDijit(widget);
        this.#serviceRegistration = this.#bundleContext.registerService(interfaces, content, serviceProperties);

        async(() => {
            const window = ct_util.findEnclosingWindow(content);
            window.on("Hide", () => {
                this._hideWindow();
            });
        }, 1000);
    }

    _hideWindow() {
        this.#elevationProfileWidget?.viewModel?.clear();
        this.#elevationProfileWidget?.destroy();
        this.#elevationProfileWidget = null;

        const registration = this.#serviceRegistration;

        // clear the reference
        this.#serviceRegistration = null;

        if (registration) {
            // call unregister
            registration.unregister();
        }
        if (this.#tool) {
            this.#tool.set("active", false);
        }
    }

    getWidget(view) {
        const elevationProfileProperties = this.getElevationProfileProperties(view);
        return this.#elevationProfileWidget = new ElevationProfile(elevationProfileProperties);
    }

    _destroyWidget() {
        this.#elevationProfileWidget.destroy();
        this.#elevationProfileWidget = undefined;
    }

    getElevationProfileProperties(view) {
        const properties = this._properties;
        return Object.assign({view: view}, properties);
    }

    _getView() {
        const mapWidgetModel = this._mapWidgetModel;
        return new Promise((resolve) => {
            if (mapWidgetModel.view) {
                resolve(mapWidgetModel.view);
            } else {
                mapWidgetModel.watch("view", ({value: view}) => {
                    resolve(view);
                });
            }
        });
    }
}
