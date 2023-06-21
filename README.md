# File Converter

A project for Information Risk Manager Courser.

This application helps to change the format of the content file within the type, allows to convert the following files:

- txt to json
- txt to xml
- json to txt
- xml to txt

## Table of Contents

- [Allowed Input Examples](#allowed-input-examples)
  - [TXT](#txt)
  - [JSON](#json)
  - [XML](#xml)
- [Getting Started](#getting-started)
- [Contributors](#contributors)

## Allowed Input Examples

### TXT

```
06096092-7;Carlos Roberto;Cortez Iraheta;2346570023456;GOLD;77951277;((-90.7695083618 17.8177528345, 10.3123123 123.123123123));
06931234-2;Samantha Karla;Flores Castellon;1234521434234;GOLD;74544436;((-90.7695083618 17.8177528345));
```

### JSON

```json
[
  {
    "documento": "06096092-7",
    "nombres": "Carlos Roberto",
    "apellidos": "Cortez Iraheta",
    "tarjeta": "U2FsdGVkX1+G/wgrJyovyLao80EQriyyMFQ9jpEOgUs=",
    "tipo": "GOLD",
    "telefono": "77951277",
    "poligono": {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "polygon",
            "coordinates": [
              [
                ["-90.7695083618", "17.8177528345"],
                ["10.3123123", "123.123123123"]
              ]
            ]
          },
          "properties": {
            "Land_Use": "I"
          }
        }
      ]
    }
  },
  {
    "documento": "06931234-2",
    "nombres": "Samantha Karla",
    "apellidos": "Flores Castellon",
    "tarjeta": "U2FsdGVkX1+1RPuiPCZKvj7BotYYjz8escv8axcwXms=",
    "tipo": "GOLD",
    "telefono": "74544436",
    "poligono": {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "polygon",
            "coordinates": [[["-90.7695083618", "17.8177528345"]]]
          },
          "properties": {
            "Land_Use": "I"
          }
        }
      ]
    }
  }
]
```

### XML

```xml
<clientes>
	<cliente>
		<documento>06931234-2</documento>
		<nombres>Carlos Roberto</nombres>
		<apellidos>Cortez Iraheta</apellidos>
		<tarjeta>U2FsdGVkX1+mMoYyKSCmBap8kHYkdL+tf2Sgh/W9V0w=</tarjeta>
		<tipo>GOLD</tipo>
		<telefono>77951277</telefono>
		<poligono>POLYGON ((-90.7695083618 17.8177528345, 10.3123123 123.123123123))</poligono>
	</cliente>
	<cliente>
		<documento>06096092-7</documento>
		<nombres>Samantha Karla</nombres>
		<apellidos>Flores Castellon</apellidos>
		<tarjeta>U2FsdGVkX19el7Xt+Ha3G1BFjA3nvzzpwrhTY/dWWRs=</tarjeta>
		<tipo>GOLD</tipo>
		<telefono>74544436</telefono>
		<poligono>POLYGON ((-90.7695083618 17.8177528345))</poligono>
	</cliente>
</clientes>
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Contributors

- Diana Umaña, 00143619
- Mario Rodriguez, 00131829
- Oscar Orellana, 00258219
- Carlos Cortez, 00204119
