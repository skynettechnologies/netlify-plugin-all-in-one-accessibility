import {
  Card,
  CardLoader,
  CardTitle,
  ConnectConfigurationSurface,
  Form,
  FormField,
  Link,
} from "@netlify/sdk/ui/react/components";
import { trpc } from "../trpc";
import { useNetlifySDK } from "@netlify/sdk/ui/react";
import {
  CommonDataSourceSchema,
  ConnectSettings,
} from "../../schema/settings-schema";
const aioaicontype1 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-1.svg'
const aioaicontype2 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-2.svg'
const aioaicontype3 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-3.svg'
const aioaicontype4 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-4.svg'
const aioaicontype5 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-5.svg'
const aioaicontype6 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-6.svg'
const aioaicontype7 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-7.svg'
const aioaicontype8 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-8.svg'
const aioaicontype9 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-9.svg'
const aioaicontype10 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-10.svg'
const aioaicontype11 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-11.svg'
const aioaicontype12 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-12.svg'
const aioaicontype13 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-13.svg'
const aioaicontype14 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-14.svg'
const aioaicontype15 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-15.svg'
const aioaicontype16 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-16.svg'
const aioaicontype17 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-17.svg'
const aioaicontype18 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-18.svg'
const aioaicontype19 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-19.svg'
const aioaicontype20 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-20.svg'
const aioaicontype21 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-21.svg'
const aioaicontype22 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-22.svg'
const aioaicontype23 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-23.svg'
const aioaicontype24 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-24.svg'
const aioaicontype25 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-25.svg'
const aioaicontype26 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-26.svg'
const aioaicontype27 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-27.svg'
const aioaicontype28 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-28.svg'
const aioaicontype29 = 'https://sanity.skynettechnologies.us/assets/images/aioa-icon-type-29.svg'
const allinoneaccessibilitylogo =
    'https://sanity.skynettechnologies.us/assets/images/all-in-one-accessibility-logo.svg'

export const ConnectConfiguration = () => {
  const sdk = useNetlifySDK();
  const accountSettingQuery = trpc.readAccountSetting.useQuery();
  const baseInput = {
    dataLayerId: sdk.context.dataLayerId!,
    configurationId: sdk.context.configurationId ?? undefined,
  };
  const connectSettingsQuery = trpc.connectSettings.read.useQuery(baseInput);
  const connectSettingsMutation = trpc.connectSettings.upsert.useMutation();

  const onSubmit = async (data: ConnectSettings & CommonDataSourceSchema) => {
    await connectSettingsMutation.mutateAsync({
      ...baseInput,
      name: data.name,
      prefix: data.prefix,
      config: data,
    });
    sdk.requestTermination();
  };

  return (
    <ConnectConfigurationSurface>
      {accountSettingQuery.isLoading ? (
        <CardLoader />
      ) : (
        <Card>
          <CardTitle>Welcome to the Showcase data source</CardTitle>
          <p>
            That account setting from the team-level configuration:{" "}
            <code>{accountSettingQuery.data}</code>
          </p>
        </Card>
      )}
      {connectSettingsQuery.isLoading ? (
        <CardLoader />
      ) : (
        <Card>
          <CardTitle>Data Source Configuration</CardTitle>
          <Form
            defaultValues={
              connectSettingsQuery.data
                ? {
                    ...connectSettingsQuery.data,
                    numberOfMockItems:
                      connectSettingsQuery.data.config.numberOfMockItems ?? 5,
                  }
                : {
                    numberOfMockItems: 5,
                    name: "",
                    prefix: "",
                  }
            }
            schema={ConnectSettings.merge(CommonDataSourceSchema)}
            onSubmit={onSubmit}
          >
            <FormField label="Data Source Name" name="name" required />
            <FormField
              label="Data Source Prefix"
              name="prefix"
              helpText="The prefix to use for types synced from this data source. It must start with an uppercase letter and can only consist of alphanumeric characters and underscores. For example, Product becomes {Prefix}Product."
              required
            />
            <FormField
              name="numberOfMockItems"
              type="number"
              label="Number of Mock Items to Create"
              helpText="Enter a number, at least 1"
              required
            />
          </Form>
          <hr />
          The code for this surface can be seen here:
          <ul>
            <li>
              &nbsp;&nbsp;
              <Link href="https://github.com/netlify/extension-showcase/blob/main/src/ui/surfaces/ConnectConfiguration.tsx">
                React UI code
              </Link>
            </li>
            <li>
              &nbsp;&nbsp;
              <Link href="https://github.com/netlify/extension-showcase/blob/main/src/server/router.ts">
                Server code
              </Link>
            </li>
          </ul>
        </Card>
      )}
    </ConnectConfigurationSurface>
  );
};
