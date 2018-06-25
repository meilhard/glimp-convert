# Summary

This is a tiny script mainly for myself and other Diabetes patients that are using the freestyle libre with the Glimp App. It's converts the quite unreadable Glimp export on dropbox ('GlicemiaMisurazioni.csv.gz') to a compact CSV-File readable by e.g. Excel. It only contains the Date, Time and the Sugar value. Ideal for reports to the doctor.

# Usage

You can either download the binary for your platform [here](https://github.com/meilhard/glimp-convert/releases) or build it from the sources like so:

```bash
yarn build
```

To convert a Glimp GZ-File to a readable CSV-File just use:

```bash
GlimpConvert-[platform] GlicemiaMisurazioni.csv.gz output.csv
```

or with the already upacked CSV-File:

```bash
GlimpConvert-[platform] GlicemiaMisurazioni.csv output.csv
```
