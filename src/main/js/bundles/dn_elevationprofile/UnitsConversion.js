/*
 * Copyright (C) 2017 con terra GmbH (info@conterra.de)
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
/**
 * this is a patch to support different localizations for the display units, if no bundle i18n can be found, we use the original UnitsConversion
 */

define(["dojo/_base/lang", "esri/dijit/ElevationProfile/UnitsConversion", "esri/tasks/GeometryService", "esri/SpatialReference", "dojo/i18n", "dojo/i18n!./nls/bundle"],
    function (d_lang, UnitsConversion, GeometryService, SpatialReference, i18n) {
        try {
            var labels =
                i18n.getLocalization("dn_elevationprofile", "bundle") || false;

            if (labels) {
                labels = labels.UNIT_LABEL;

                d_lang.extend(UnitsConversion, {
                    UNIT_LABEL: {
                        esriMillimeters: labels.esriMillimeters,
                        esriCentimeters: labels.esriCentimeters,
                        esriDecimeters: labels.esriDecimeters,
                        esriMeters: labels.esriMeters,
                        esriKilometers: labels.esriKilometers,
                        esriInches: labels.esriInches,
                        esriFeet: labels.esriFeet,
                        esriYards: labels.esriYards,
                        esriMiles: labels.esriMiles,
                        esriNauticalMiles: labels.esriNauticalMiles,
                        esriAcres: labels.esriAcres,
                        esriAres: labels.esriAres,
                        esriHectares: labels.esriHectares,
                        esriSquareInches: labels.esriSquareInches,
                        esriSquareFeet: labels.esriSquareFeet,
                        esriSquareYards: labels.esriSquareYards,
                        esriSquareMiles: labels.esriSquareMiles,
                        esriSquareNauticalMiles: labels.esriSquareNauticalMiles,
                        esriSquareMillimeters: labels.esriSquareMillimeters,
                        esriSquareCentimeters: labels.esriSquareCentimeters,
                        esriSquareDecimeters: labels.esriSquareDecimeters,
                        esriSquareMeters: labels.esriSquareMeters,
                        esriSquareKilometers: labels.esriSquareKilometers
                    }
                });
            }
        }
        catch (e) {
            console.error(e);
        }
    }
);
