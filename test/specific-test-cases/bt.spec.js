/* global describe, it */
import { expect } from 'chai';
import JsonConverter from '../../src/main';

describe('[test case] => BT', () => {

  let results = null;

  const dataSet = {
    "tv-packages": {
      "PACKAGES": [
        {
          "EXPORT_PACKAGE": {
            "ID": "EC-STAC",
            "name": "Starter + BT STAC",
            "contract_length": "12-month TV contract",
            "price": "3.50",
            "price_strikethrough": "",
            "is_upsell": ""
          },
          "subHead": "<strong>BT standard broadband deals</strong>",
          "subHeadImage": "",
          "sainsburysSubHead": "",
          "isRecommended": "",
          "template": "default"
        }
      ]
    },
    "add-tv-default": {
      "PACKAGES": [
        {
          "EXPORT_PACKAGE": {
            "ID": "INF-1",
            "name": "Starter + BT",
            "contract_length": "12-month TV contract",
            "price": "3.50",
            "price_strikethrough": "",
            "is_upsell": ""
          },
          "subHead": "<strong>BT standard broadband deals</strong>",
          "subHeadImage": "",
          "sainsburysSubHead": "",
          "isRecommended": "",
          "template": "default"
        }
      ]
    }
  };

  const instructions = [
    [
      ["*.PACKAGES", "*.items"]
    ],
    [
      ["*.items[].EXPORT_PACKAGE", "*.items[]"]
    ]
  ];

  before(() => {
    const converter = new JsonConverter(dataSet);
    results = converter.convert(instructions);
  });

  it('instruction [ 1 ] => PACKAGES renamed to ITEMS', () => {
    expect(results['tv-packages'].PACKAGES).to.be.undefined;
    expect(results['tv-packages'].items).to.be.not.undefined;
  });

  it('instruction [ 1 ] => EXPORT_PACKAGE merged with ITEMS', () => {
    expect(results['tv-packages'].EXPORT_PACKAGE).to.be.undefined;
    expect(results['tv-packages'].items[0].ID).to.be.equal('EC-STAC');
    expect(results['add-tv-default'].EXPORT_PACKAGE).to.be.undefined;
    expect(results['add-tv-default'].items[0].ID).to.be.equal('INF-1');
  });

});
