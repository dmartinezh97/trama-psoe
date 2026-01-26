import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async () => {
  // Load Inter font
  const interBold = fs.readFileSync(
    path.resolve('./public/fonts/Inter-Bold.ttf')
  );
  const interBlack = fs.readFileSync(
    path.resolve('./public/fonts/Inter-Black.ttf')
  );
  const interRegular = fs.readFileSync(
    path.resolve('./public/fonts/Inter-Regular.ttf')
  );
  const interMedium = fs.readFileSync(
    path.resolve('./public/fonts/Inter-Medium.ttf')
  );

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#0A0A0A',
          overflow: 'hidden',
        },
        children: [
          // Background gradient circle (decorative)
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                right: '-100px',
                bottom: '-100px',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
              },
            },
          },
          // Top right decorative circle
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                right: '-50px',
                top: '-150px',
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)',
              },
            },
          },
          // Red accent line
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                left: '0',
                top: '0',
                width: '8px',
                height: '630px',
                backgroundColor: '#DC2626',
              },
            },
          },
          // Content area
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '32px',
                height: '630px',
                paddingLeft: '80px',
                paddingRight: '80px',
              },
              children: [
                // Top badge
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#DC2626',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      width: 'auto',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#FFFFFF',
                          },
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: 700,
                            fontFamily: 'Inter',
                            letterSpacing: '1px',
                          },
                          children: 'INVESTIGACIÓN',
                        },
                      },
                    ],
                  },
                },
                // Headline
                {
                  type: 'h1',
                  props: {
                    style: {
                      color: '#FFFFFF',
                      fontSize: '96px',
                      fontWeight: 900,
                      fontFamily: 'Inter',
                      letterSpacing: '-2px',
                      margin: 0,
                      lineHeight: 1,
                    },
                    children: 'La Trama PSOE',
                  },
                },
                // Subheadline
                {
                  type: 'p',
                  props: {
                    style: {
                      color: '#999999',
                      fontSize: '28px',
                      fontFamily: 'Inter',
                      margin: 0,
                      maxWidth: '700px',
                    },
                    children: 'Corrupción, casos judiciales e imputados del PSOE',
                  },
                },
                // CTA area
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '24px',
                      marginTop: '16px',
                    },
                    children: [
                      // CTA Button
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            backgroundColor: '#DC2626',
                            padding: '20px 32px',
                            borderRadius: '4px',
                          },
                          children: [
                            {
                              type: 'span',
                              props: {
                                style: {
                                  color: '#FFFFFF',
                                  fontSize: '13px',
                                  fontWeight: 700,
                                  fontFamily: 'Inter',
                                  letterSpacing: '1px',
                                },
                                children: 'EXPLORAR CASOS',
                              },
                            },
                            {
                              type: 'span',
                              props: {
                                style: {
                                  color: '#FFFFFF',
                                  fontSize: '18px',
                                },
                                children: '→',
                              },
                            },
                          ],
                        },
                      },
                      // URL
                      {
                        type: 'span',
                        props: {
                          style: {
                            color: '#666666',
                            fontSize: '18px',
                            fontWeight: 500,
                            fontFamily: 'Inter',
                          },
                          children: 'trama-psoe.com',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interMedium,
          weight: 500,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interBold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interBlack,
          weight: 900,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
