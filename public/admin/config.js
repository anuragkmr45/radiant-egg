(function () {
  const iconValues = [
    "award",
    "badge",
    "bolt",
    "briefcase",
    "building",
    "clipboard",
    "droplets",
    "factory",
    "flask",
    "fuel",
    "graduation",
    "hardhat",
    "layers",
    "package",
    "scroll",
    "search",
    "shield",
    "train",
  ];

  const stringField = (label, name, overrides = {}) => ({
    label,
    name,
    widget: "string",
    ...overrides,
  });

  const textField = (label, name, overrides = {}) => ({
    label,
    name,
    widget: "text",
    ...overrides,
  });

  const hiddenField = (name, defaultValue) => ({
    label: name,
    name,
    widget: "hidden",
    default: defaultValue,
  });

  const booleanField = (label, name, overrides = {}) => ({
    label,
    name,
    widget: "boolean",
    ...overrides,
  });

  const numberField = (label, name, overrides = {}) => ({
    label,
    name,
    widget: "number",
    value_type: "float",
    ...overrides,
  });

  const selectField = (label, name, options, overrides = {}) => ({
    label,
    name,
    widget: "select",
    options: options.map((value) => ({ label: value, value })),
    ...overrides,
  });

  const objectField = (label, name, fields, overrides = {}) => ({
    label,
    name,
    widget: "object",
    fields,
    ...overrides,
  });

  const objectListField = (label, name, fields, overrides = {}) => ({
    label,
    name,
    widget: "list",
    fields,
    ...overrides,
  });

  const listOfStringsField = (label, name, overrides = {}) => ({
    label,
    name,
    widget: "list",
    field: stringField("Item", "value"),
    ...overrides,
  });

  const iconField = (overrides = {}) =>
    selectField("Icon", "icon", iconValues, overrides);

  const imageFields = () => [
    stringField("Source", "src", {
      hint: "Use /uploads/... for locally managed media or a full https:// URL.",
    }),
    stringField("Alt text", "alt"),
  ];

  const seoFields = () => [
    stringField("Title", "title"),
    textField("Description", "description"),
    stringField("Canonical Path", "path"),
  ];

  const actionFields = (includeDescription) => {
    const fields = [
      stringField("Label", "label"),
      stringField("Href", "href"),
    ];

    if (includeDescription) {
      fields.push(textField("Description", "description"));
    }

    return fields;
  };

  const navItemFields = (includeDescription) => {
    const fields = [
      stringField("Label", "label"),
      stringField("Href", "href"),
    ];

    if (includeDescription) {
      fields.push(textField("Description", "description", { required: false }));
    }

    return fields;
  };

  const featureCardFields = () => [
    stringField("Title", "title"),
    textField("Description", "description"),
    iconField(),
  ];

  const ctaFields = (includeSecondaryAction) => {
    const fields = [
      stringField("Title", "title"),
      textField("Description", "description"),
      objectField("Primary Action", "primaryAction", actionFields(false)),
    ];

    if (includeSecondaryAction) {
      fields.push(
        objectField("Secondary Action", "secondaryAction", actionFields(false), {
          required: false,
        }),
      );
    }

    return fields;
  };

  const serviceHeroFields = ({ includeBackground, includeGlow, includeAction }) => {
    const fields = [
      stringField("Eyebrow", "eyebrow"),
      stringField("Title", "title"),
      textField("Summary", "summary"),
      textField("Description", "description", { required: false }),
    ];

    if (includeGlow) {
      fields.push(
        selectField("Glow Position", "glowPosition", ["left", "right"], {
          required: false,
        }),
      );
    }

    if (includeBackground) {
      fields.push(objectField("Background Image", "backgroundImage", imageFields()));
    }

    if (includeAction) {
      fields.push(
        objectField("Primary Action", "primaryAction", actionFields(false), {
          required: false,
        }),
      );
    }

    return fields;
  };

  const cmsConfig = {
    load_config_file: false,
    backend: {
      name: "git-gateway",
      branch: "main",
    },
    local_backend: true,
    media_folder: "public/uploads",
    public_folder: "/uploads",
    editor: {
      preview: false,
    },
    collections: [
      {
        label: "Globals",
        name: "globals",
        files: [
          {
            label: "Site Settings",
            name: "site",
            file: "content/site.json",
            format: "json",
            fields: [
              stringField("Site Name", "name"),
              stringField("Short Name", "shortName"),
              textField("Description", "description"),
              stringField("Site URL", "siteUrl"),
              stringField("Locale", "locale"),
              textField("Tagline", "tagline"),
              textField("Footer Headline", "footerHeadline"),
              textField("Footer Description", "footerDescription"),
              listOfStringsField("Default Keywords", "defaultKeywords"),
              objectListField("Primary Navigation", "primaryNav", navItemFields(false)),
              objectListField("Services Navigation", "serviceNav", navItemFields(true)),
              objectListField(
                "Footer Groups",
                "footerGroups",
                [
                  stringField("Title", "title"),
                  objectListField("Links", "links", navItemFields(true)),
                ],
              ),
              objectField("Contact Details", "contact", [
                stringField("Email", "email"),
                stringField("Phone", "phone"),
                textField("Address", "address"),
                stringField("Hours", "hours"),
              ]),
              objectField("Default CTA", "defaultCta", actionFields(true)),
              objectField("Home Chrome", "homeChrome", [
                stringField("Brand Name", "brandName"),
                stringField("Legal Name", "legalName"),
                stringField("Short Name", "shortName"),
                stringField("Tagline", "tagline"),
                stringField("Phone Label", "phoneLabel"),
                objectListField("Navigation", "nav", navItemFields(false)),
                objectField("Quote CTA", "quoteCta", actionFields(true)),
                textField("Footer Description", "footerDescription"),
                objectListField(
                  "Footer Groups",
                  "footerGroups",
                  [
                    stringField("Title", "title"),
                    objectListField("Links", "links", navItemFields(false)),
                  ],
                ),
                objectField("Contact Details", "contact", [
                  stringField("Email", "email"),
                  stringField("Phone", "phone"),
                  textField("Address", "address"),
                  stringField("Hours", "hours"),
                ]),
              ]),
              objectListField("Routes", "routes", [
                stringField("Href", "href"),
                selectField("Change Frequency", "changeFrequency", [
                  "always",
                  "hourly",
                  "daily",
                  "weekly",
                  "monthly",
                  "yearly",
                  "never",
                ]),
                numberField("Priority", "priority", {
                  min: 0,
                  max: 1,
                  step: 0.1,
                }),
              ]),
            ],
          },
        ],
      },
      {
        label: "Pages",
        name: "pages",
        files: [
          {
            label: "Home",
            name: "home",
            file: "content/pages/home.json",
            format: "json",
            fields: [
              objectField("SEO", "seo", seoFields()),
              objectField("Hero", "hero", [
                stringField("Title Lead", "titleLead"),
                stringField("Title Accent", "titleAccent"),
                stringField("Title Tail", "titleTail"),
                textField("Description", "description"),
                objectField("Background Image", "backgroundImage", imageFields()),
                objectField("Primary Action", "primaryAction", actionFields(false)),
                objectField("Secondary Action", "secondaryAction", actionFields(false)),
              ]),
              objectListField("Credentials", "credentials", [
                stringField("Label", "label"),
                iconField(),
              ]),
              objectField("About Section", "about", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                listOfStringsField("Paragraphs", "paragraphs"),
                objectField("Image", "image", imageFields()),
                objectField("Stat", "stat", [
                  stringField("Value", "value"),
                  stringField("Label", "label"),
                ]),
                objectField("Action", "action", actionFields(false)),
              ]),
              objectField("Services Section", "services", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description"),
                objectListField("Items", "items", [
                  stringField("Title", "title"),
                  textField("Description", "description"),
                  stringField("Href", "href"),
                  iconField(),
                ]),
              ]),
              objectField("Reasons Section", "reasons", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description"),
                objectListField("Items", "items", featureCardFields()),
              ]),
              objectField("Industries Section", "industries", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description"),
                objectListField("Items", "items", [
                  stringField("Title", "title"),
                  iconField(),
                ]),
              ]),
              objectField("Clients Section", "clients", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description"),
                objectListField("Items", "items", [stringField("Label", "label")]),
              ]),
              objectField("CTA", "cta", [
                stringField("Title Lead", "titleLead"),
                stringField("Title Accent", "titleAccent"),
                textField("Description", "description"),
                objectField("Action", "action", actionFields(false)),
              ]),
            ],
          },
          {
            label: "About",
            name: "about",
            file: "content/pages/about.json",
            format: "json",
            fields: [
              objectField("SEO", "seo", seoFields()),
              objectField("Hero", "hero", [
                objectListField("Breadcrumbs", "breadcrumbs", [
                  stringField("Label", "label"),
                  stringField("Href", "href", { required: false }),
                ]),
                stringField("Title", "title"),
                textField("Description", "description"),
              ]),
              objectField("Intro", "intro", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                listOfStringsField("Paragraphs", "paragraphs"),
                objectField("Image", "image", imageFields()),
                objectListField("Credentials", "credentials", [
                  stringField("Accent", "accent"),
                  stringField("Label", "label"),
                ]),
              ]),
              objectField("Strengths", "strengths", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description", { required: false }),
                objectListField("Items", "items", featureCardFields()),
              ]),
              objectField("Principles", "principles", [
                objectListField("Items", "items", [
                  stringField("Title", "title"),
                  textField("Description", "description"),
                  iconField(),
                  listOfStringsField("Values", "values", { required: false }),
                ]),
              ]),
              objectField("Leadership", "leadership", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description", { required: false }),
                objectListField("Members", "members", [
                  stringField("Name", "name"),
                  stringField("Role", "role"),
                  textField("Description", "description"),
                  iconField(),
                  stringField("Badge", "badge", { required: false }),
                  booleanField("Featured", "featured", { required: false, default: false }),
                ]),
              ]),
              objectListField("Stats", "stats", [
                stringField("Value", "value"),
                stringField("Label", "label"),
              ]),
              objectField("Portfolio", "portfolio", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description", { required: false }),
                objectListField("Items", "items", [
                  stringField("Label", "label"),
                  iconField(),
                ]),
              ]),
              objectField("CTA", "cta", ctaFields(true)),
            ],
          },
          {
            label: "Consultancy",
            name: "consultancy",
            file: "content/pages/consultancy.json",
            format: "json",
            fields: [
              objectField("SEO", "seo", seoFields()),
              objectField("Hero", "hero", serviceHeroFields({
                includeBackground: true,
                includeGlow: true,
                includeAction: true,
              })),
              objectField("Intro", "intro", [
                hiddenField("variant", "split"),
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                listOfStringsField("Paragraphs", "paragraphs"),
                objectField("Image", "image", imageFields()),
                objectListField("Highlights", "highlights", [
                  stringField("Label", "label"),
                  iconField(),
                ], {
                  required: false,
                }),
              ]),
              objectListField("Detail Sections", "detailSections", [
                stringField("Anchor ID", "anchorId", { required: false }),
                stringField("Title", "title"),
                iconField(),
                objectField("Image", "image", imageFields()),
                selectField("Image Side", "imageSide", ["left", "right"]),
                booleanField("Sticky Image", "stickyImage", { required: false, default: false }),
                selectField("Tone", "tone", ["default", "muted"], {
                  required: false,
                }),
                listOfStringsField("Paragraphs", "paragraphs"),
                stringField("Scope Label", "scopeLabel"),
                objectListField("Capabilities", "capabilities", [
                  stringField("Label", "label"),
                  iconField(),
                ]),
                stringField("Projects Title", "projectsTitle"),
                objectListField("Projects", "projects", [
                  stringField("Title", "title"),
                  stringField("Client", "client"),
                  textField("Description", "description"),
                  iconField(),
                ]),
              ]),
              objectListField("Expertise Strip", "expertiseStrip", [
                stringField("Label", "label"),
                iconField(),
              ]),
              objectField("CTA", "cta", ctaFields(true)),
            ],
          },
          {
            label: "NDT",
            name: "ndt",
            file: "content/pages/ndt.json",
            format: "json",
            fields: [
              objectField("SEO", "seo", seoFields()),
              objectField("Hero", "hero", serviceHeroFields({
                includeBackground: false,
                includeGlow: true,
                includeAction: false,
              })),
              objectField("Intro", "intro", [
                hiddenField("variant", "centered"),
                textField("Description", "description"),
              ]),
              objectField("Methods", "methods", [
                stringField("Anchor ID", "anchorId", { required: false }),
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description", { required: false }),
                objectListField("Items", "items", featureCardFields()),
              ]),
              objectField("Applications", "applications", [
                stringField("Anchor ID", "anchorId", { required: false }),
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                stringField("Industries Title", "industriesTitle"),
                objectListField("Industries", "industries", [
                  stringField("Label", "label"),
                  iconField(),
                ]),
                stringField("Equipment Title", "equipmentTitle"),
                listOfStringsField("Equipment", "equipment"),
              ]),
              objectField("CTA", "cta", ctaFields(false)),
            ],
          },
          {
            label: "TPI",
            name: "tpi",
            file: "content/pages/tpi.json",
            format: "json",
            fields: [
              objectField("SEO", "seo", seoFields()),
              objectField("Hero", "hero", serviceHeroFields({
                includeBackground: false,
                includeGlow: true,
                includeAction: false,
              })),
              objectField("Intro", "intro", [
                hiddenField("variant", "centered"),
                textField("Description", "description"),
              ]),
              objectField("List Grid", "listGrid", [
                stringField("Anchor ID", "anchorId", { required: false }),
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description", { required: false }),
                objectListField("Items", "items", [
                  stringField("Title", "title"),
                  iconField(),
                  listOfStringsField("Items", "items"),
                ]),
              ]),
              objectField("Process", "process", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description", { required: false }),
                objectListField("Steps", "steps", [
                  stringField("Step Label", "stepLabel"),
                  stringField("Title", "title"),
                  textField("Description", "description"),
                  iconField(),
                ]),
              ]),
              objectField("Standards", "standards", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description", { required: false }),
                objectListField("Items", "items", [
                  stringField("Code", "code"),
                  stringField("Description", "description"),
                  iconField(),
                  booleanField("Featured", "featured", { required: false, default: false }),
                ]),
              ]),
              objectField("CTA", "cta", ctaFields(false)),
            ],
          },
          {
            label: "Contact",
            name: "contact",
            file: "content/pages/contact.json",
            format: "json",
            fields: [
              objectField("SEO", "seo", seoFields()),
              objectField("Hero", "hero", [
                stringField("Eyebrow", "eyebrow"),
                stringField("Title", "title"),
                textField("Description", "description"),
              ]),
              objectListField("Info Strip", "infoStrip", [
                selectField("Kind", "kind", ["address", "phone", "email"]),
                stringField("Label", "label"),
                textField("Value", "value"),
                stringField("Href", "href", { required: false }),
              ]),
              objectField("Form", "form", [
                stringField("Title", "title"),
                textField("Description", "description"),
                stringField("Service Label", "serviceLabel"),
                stringField("Service Placeholder", "servicePlaceholder"),
                objectListField("Service Options", "serviceOptions", [
                  stringField("Label", "label"),
                  stringField("Value", "value"),
                ]),
                stringField("Submit Label", "submitLabel"),
                textField("Success Message", "successMessage"),
              ]),
              objectField("Location", "location", [
                stringField("Title", "title"),
                textField("Description", "description"),
                textField("Address", "address"),
                stringField("Map Query", "mapQuery"),
                stringField("Open in Maps URL", "openInMapsHref"),
              ]),
              objectField("Direct Contacts", "directContacts", [
                stringField("Title", "title"),
                textField("Description", "description"),
                objectListField("People", "people", [
                  stringField("Name", "name"),
                  stringField("Role", "role"),
                  stringField("Phone", "phone"),
                  stringField("Email", "email"),
                ]),
              ]),
            ],
          },
        ],
      },
    ],
  };

  const { initCMS: init } = window;
  init({ config: cmsConfig });
})();
