import { describe, it, expect } from "vitest";
import { bundleProcess } from "../../../src/parser/csv-bundler";
import { ADMIN_USER, testContext } from "../../utils/testQuery";
import type {StixBundle, StixDomainObject } from "../../../src/types/stix-common";
import {
  indicatorsWithExternalReferencesCsvContent,
  indicatorsWithExternalReferencesCsvMapper
} from "../../data/csv-bundler/external-references-constants";
import type {CsvMapperParsed} from "../../../src/modules/internal/csvMapper/csvMapper-types";

describe('CSV bundler', () => {
  describe('Embedded properties', () => {
    it('Should list external references', async() => {
      const indicatorsWithExternalReferencesExpectedBundle: StixBundle = {
        type: "bundle",
        id: "bundle--ba24abde-ecd4-4e29-8d3b-5cae164b646e",
        spec_version: "2.1",
        objects: [
          {
            id: "indicator--adf3f1be-c67d-5f8a-85fb-3668f411d8b8",
            spec_version: "2.1",
            revoked: false,
            confidence: 100,
            created: "2024-05-14T15:49:36.125Z",
            modified: "2024-05-14T15:49:36.401Z",
            pattern_type: "stix",
            pattern: "[ipv4-addr:value = '198.168.8.2']",
            name: "[Manually][ipv4-addr:value = '198.168.8.2']",
            valid_from: "2024-05-14T15:49:29.656Z",
            valid_until: "2024-06-03T21:24:09.090Z",
            x_opencti_score: 50,
            x_opencti_detection: false,
            x_opencti_main_observable_type: "IPv4-Addr",
            external_references: [
              {
                source_name: "http://twitter.com/filigraner",
                url: "http://twitter.com/filigraner"
              }
            ],
            x_opencti_id: "5c82d722-a390-464a-bfd4-1461f8309337",
            x_opencti_type: "Indicator",
            type: "indicator"
          },
          {
            id: "indicator--7be2cb5d-ec2b-5bdd-89eb-5802b71faabd",
            spec_version: "2.1",
            revoked: false,
            confidence: 100,
            created: "2024-05-13T12:53:12.522Z",
            modified: "2024-05-14T15:46:23.180Z",
            pattern_type: "stix",
            pattern: "[ipv4-addr:value = '198.168.8.1']",
            name: "[Manually][ipv4-addr:value = '198.168.8.1']",
            valid_from: "2024-05-13T12:53:12.510Z",
            valid_until: "2024-06-29T12:53:12.510Z",
            x_opencti_score: 50,
            x_opencti_detection: false,
            x_opencti_main_observable_type: "IPv4-Addr",
            external_references: [
              {
                source_name: "http://twitter.com/filigraner",
                url: "http://twitter.com/filigraner"
              }
            ],
            x_opencti_id: "3754f38e-fe65-4fb1-99c3-60e5b1b82fed",
            x_opencti_type: "Indicator",
            type: "indicator"
          }
        ] as unknown as StixDomainObject[]
      };
      const indicatorsWithExternalReferencesActualBundle = await bundleProcess(
        testContext,
        ADMIN_USER,
        Buffer.from(indicatorsWithExternalReferencesCsvContent),
        indicatorsWithExternalReferencesCsvMapper as CsvMapperParsed
      );
      expect(
        indicatorsWithExternalReferencesActualBundle.objects.map(stixObject => (stixObject as StixDomainObject).external_references)
      ).toStrictEqual(
        indicatorsWithExternalReferencesExpectedBundle.objects.map(stixObject => (stixObject as StixDomainObject).external_references)
      )
    })
  })
})